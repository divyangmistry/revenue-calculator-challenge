import React, { useState, useEffect } from 'react';

type RangeSliderProps = {
  id: string;
  min: number;
  max: number;
  initialValue: number;
  onChange: (value: number) => void;
};

const RangeSlider: React.FC<RangeSliderProps> = ({ id, min, max, initialValue, onChange }) => {
  const [value, setValue] = useState<number>(initialValue);

  useEffect(() => {
    updateRangeBackground();
    onChange(value);
  }, [value]);

  const updateRangeBackground = () => {
    const percentage = ((value - min) / (max - min)) * 100;
    const rangeInput = document.getElementById(id) as HTMLInputElement;
    if (rangeInput) {
      rangeInput.style.background = `linear-gradient(to right, #b0cc53 0%, #b0cc53 ${percentage}%, #D1D5DB ${percentage}%, #D1D5DB 100%)`;
    }
  };

  return (
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value))}
      className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
    />
  );
};

export default RangeSlider;
