import React, { useState } from 'react';

interface ConsentCheckboxProps {
  onConsent: () => void;
}

export function ConsentCheckbox({ onConsent }: ConsentCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      onConsent();
    }
  };

  return (
    <div className="mt-8 flex items-center gap-3">
      <input
        type="checkbox"
        id="consent"
        checked={isChecked}
        onChange={handleChange}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />
      <label htmlFor="consent" className="text-white cursor-pointer select-none">
        上記の内容に同意します
      </label>
    </div>
  );
}