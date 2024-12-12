import React, { useEffect } from 'react';
import { ConsentBox } from './ui/ConsentBox';
import { ConsentText } from './ui/ConsentText';
import { CharacterImage } from './ui/CharacterImage';

interface ConsentScreenProps {
  onConsent: () => void;
  isTransitioning: boolean;
}

export function ConsentScreen({ onConsent, isTransitioning }: ConsentScreenProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onConsent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onConsent]);

  return (
    <div className={`
      fixed inset-0 flex
      transition-opacity duration-500
      ${isTransitioning ? 'opacity-0' : 'opacity-100'}
    `}>
      <div className="w-1/2 relative">
        <CharacterImage publicId="ruthkpq9bbyfasf3kkoz" />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <ConsentBox>
          <ConsentText />
        </ConsentBox>
      </div>
    </div>
  );
}