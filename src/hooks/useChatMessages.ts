import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { sendMessage } from '../api/chat';
import { messages } from '../constants/messages';
import { APIError } from '../types/errors';
import { createMessage } from '../utils/messageUtils';
import { MAX_ASSISTANT_MESSAGES } from '../constants/limits';
import { createStreamProcessor } from '../utils/streamReaderUtils';

export function useChatMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const getAssistantMessageCount = () => 
    messages.filter(msg => msg.role === 'assistant').length;

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || isLoading || isLocked) return;

    try {
      const userMessage = createMessage(input, 'user');
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);

      const response = await sendMessage(input, conversationId);
      if (!response) throw new APIError(messages.errors.noResponse);

      const reader = response.getReader();
      const assistantMessage = createMessage('', 'assistant');
      setMessages(prev => [...prev, assistantMessage]);

      let fullResponse = '';
      
      try {
        for await (const data of createStreamProcessor(reader)) {
          if (data.message) {
            fullResponse += data.message;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === assistantMessage.id
                  ? { ...msg, content: fullResponse }
                  : msg
              )
            );
          }
          if (data.conversationId) {
            setConversationId(data.conversationId);
          }
        }

        const currentCount = getAssistantMessageCount();
        if (currentCount >= MAX_ASSISTANT_MESSAGES) {
          setIsLocked(true);
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              createMessage('おっと、そろそろ時間みたい。今日はありがとうね。', 'assistant')
            ]);
          }, 800);
        }
      } catch (error) {
        console.error('Stream processing error:', error);
        throw new APIError(messages.errors.noResponse);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage = error instanceof APIError 
        ? error.message 
        : messages.errors.sendFailed;
      setMessages(prev => [...prev, createMessage(errorMessage, 'assistant')]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    isLocked,
    handleSendMessage,
    addMessage,
  };
}