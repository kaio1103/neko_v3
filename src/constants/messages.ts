export const messages = {
  errors: {
    sendFailed: 'メッセージの送信に失敗しました',
    noResponse: '応答を受信できませんでした',
    videoNotSupported: 'お使いのブラウザは動画の再生に対応していません',
    speechRecognitionNotSupported: 'お使いのブラウザは音声認識に対応していません',
    emptyMessage: 'メッセージを入力してください',
    streamProcessing: 'ストリームの処理中にエラーが発生しました',
    invalidStreamData: '無効なストリームデータを受信しました',
  },
  placeholders: {
    messageInput: 'メッセージを入力...',
    voiceInput: '音声入力中...',
  },
  loading: {
    sending: '送信中...',
    thinking: '考え中...',
  },
  buttons: {
    send: '送信',
    startVoice: '音声入力を開始',
    stopVoice: '音声入力を停止',
  },
  accessibility: {
    userAvatar: 'ユーザーアバター',
    messageInput: 'メッセージ入力欄',
    sendButton: '送信ボタン',
  },
} as const;