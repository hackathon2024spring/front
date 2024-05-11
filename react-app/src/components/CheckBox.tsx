import React from 'react';

interface CheckboxProps {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onChange }) => {
  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}  // 親コンポーネントからの状態を直接使用
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className="block w-[3.5em] cursor-pointer bg-gray-500 rounded-full 
        p-[5px] after:block after:h-[1.5em] after:w-[1.5em] after:rounded-full 
        after:bg-white after:transition peer-checked:bg-yellow-500 
        peer-checked:after:translate-x-[calc(100%-2px)]"
      >
      </span>
    </label>
  );
}

export default Checkbox;
