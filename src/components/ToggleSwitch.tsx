import { FC, useState } from "react";

interface ToggleProps {
  onToggle: () => void;
}

const ToggleSwitch: FC<ToggleProps> = (props) => {
  const [selectedOption, setSelectedOption] = useState("left");

  const handleToggle = (option: string) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
      props.onToggle();
    }
  };

  return (
    <div className="w-full p-4 rounded-lg">
      <div className="relative max-w-md mx-auto">
        <div className="flex bg-gray-200 p-1 rounded-lg relative">
          {/* Sliding Background */}
          <div
            className={`
              absolute top-1 bottom-1 w-1/2 rounded-md bg-white 
              transform transition-transform duration-200 ease-in-out shadow-lg
              ${selectedOption === "right" ? "translate-x-full" : "translate-x-0"}
            `}
          />

          {/* Left Button */}
          <button
            onClick={() => handleToggle("left")}
            className={`
              relative flex-1 py-2 text-sm font-medium rounded-md
              transition-colors duration-200
              ${selectedOption === "left" ? "text-gray-800" : "text-gray-500"}
              hover:text-gray-800 focus:outline-none
            `}
          >
            Your Games
          </button>

          {/* Right Button */}
          <button
            onClick={() => handleToggle("right")}
            className={`
              relative flex-1 py-2 text-sm font-medium rounded-md
              transition-colors duration-200
              ${selectedOption === "right" ? "text-gray-800" : "text-gray-500"}
              hover:text-gray-800 focus:outline-none
            `}
          >
            AI Trainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
