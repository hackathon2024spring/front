import React, { useState } from 'react';

const Checkbox: React.FC = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(event.target.checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={isCheck}
        onChange={handleCheckboxChange}
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
