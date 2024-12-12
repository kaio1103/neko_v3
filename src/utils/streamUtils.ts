import { StreamData, ProcessedStreamData } from '../types/stream';
import { ValidationError, StreamProcessingError } from '../types/errors';
import { messages } from '../constants/messages';
import { isValidStreamData } from './validationUtils';

export function processStreamData(data: string): ProcessedStreamData | null {
  try {
    // 不完全なJSONデータの処理を防ぐ
    if (!data.endsWith('}')) {
      throw new ValidationError('Incomplete JSON data');
    }

    const parsedData = JSON.parse(data) as StreamData;
    
    if (!isValidStreamData(parsedData)) {
      throw new ValidationError(messages.errors.invalidStreamData);
    }

    // 必要なデータのみを抽出
    return {
      message: parsedData.answer || '',
      conversationId: parsedData.conversation_id,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('JSON parsing error:', {
        data,
        error: error.message,
      });
      return null;
    }

    if (error instanceof ValidationError) {
      console.error('Stream validation error:', {
        data,
        error: error.message,
      });
      return null;
    }

    console.error('Stream processing error:', {
      data,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return null;
  }
}