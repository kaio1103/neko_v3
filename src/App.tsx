import React, { useEffect } from 'react';
import { CharacterSpace } from './components/CharacterSpace';
import { ChatSection } from './components/ChatSection';
import { Background } from './components/Background';
import { ConsentScreen } from './components/ConsentScreen';
import { useChat } from './hooks/useChat';
import { useConsent } from './hooks/useConsent';
import { useFadeIn } from './hooks/useFadeIn';
import { imageConfig } from './config/images';

export default function App() {
  const {
    messages,
    input,
    isLoading,
    isLocked,
    isListening,
    messagesEndRef,
    setInput,
    handleSubmit,
  } = useChat();

  const { hasConsented, isTransitioning, handleConsent } = useConsent();

  // 初期フェードイン効果を適用
  useFadeIn();

  return (
    <Background className="flex">
      {!hasConsented ? (
        <ConsentScreen 
          onConsent={handleConsent}
          isTransitioning={isTransitioning}
        />
      ) : (
        <div 
          className={`
            flex w-full
            transition-opacity duration-500 ease-in-out
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}
          style={{ 
            animation: isTransitioning ? 'none' : 'fadeIn 500ms ease-in-out forwards'
          }}
        >
          <CharacterSpace 
            publicId={input.trim() ? imageConfig.character.thinking : imageConfig.character.default}
          />
          <ChatSection
            messages={messages}
            input={input}
            isLoading={isLoading}
            isLocked={isLocked}
            isListening={isListening}
            messagesEndRef={messagesEndRef}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </Background>
  );
}