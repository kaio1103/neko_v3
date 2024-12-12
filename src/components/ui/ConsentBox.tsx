import React from 'react';

interface ConsentBoxProps {
  children: React.ReactNode;
  id?: string;
}

export function ConsentBox({ children, id }: ConsentBoxProps) {
  return (
    <div 
      id={id}
      className="
        max-w-[100%] w-[520px] mx-auto
        bg-gray-900/20 rounded-xl p-8
        backdrop-blur-sm transition-opacity
        shadow-lg
      "
    >
      {children}
    </div>
  );
}