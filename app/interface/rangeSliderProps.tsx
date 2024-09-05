interface RangeSliderProps {
  id: string;
  min: number;
  max: number;
  initialValue: number;
  onChange: (value: number) => void;
};