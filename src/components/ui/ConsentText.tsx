import React from 'react';

export function ConsentText() {
  return (
    <div className="text-white space-y-4">
      <h2 className="text-2xl text-center mb-6">はじめに</h2>
      <div className="space-y-3 text-sm leading-relaxed">
        <p>・これは公式に音環を紹介するものではなく、あくまでエンタメとして、平然と嘘も吐くAIと対話できる企画です。</p>
        <p>・AIに翻弄される昨今の世の中に対する風刺であり、受験生／来場者のメディア・リテラシーへの挑戦（なのかもしれない）。</p>
        <p>・ちょいちょい嘘を吐くので、真に受けないで。本気で気になることがあれば、近くにいる音環生を捕まえて質問して。</p>
        <p>・千住 ArtPath2024 の会場案内はいたしません。お近くのスタッフにお声かけください。</p>
        <p>・入試に関する情報は提供いたしません。</p>
        <p>・出力される情報は「音環生 個人の感想」やインターネット上の情報に基づき、AIが学習、変形したものです。音環公式の情報ではない。</p>
        <p>・WEB公開やアーカイブはしない。録音・撮影も禁止。（メモも取らせない？）ログをさかのぼることもできないので、心に刻んで。</p>
      </div>
      <p className="mt-8 text-sm text-center text-white/80">
        Enterキーを押して続行
      </p>
    </div>
  );
}