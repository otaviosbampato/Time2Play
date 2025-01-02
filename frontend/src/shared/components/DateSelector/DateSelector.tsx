// DateSelector.tsx
import React, { useState, useRef } from "react";
import styles from "./DateSelector.module.css";

interface DateSelectorProps {
  onChange: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    onChange(e.target.value);
    setIsOpen(false);
  };

  return (
    <div 
      className={styles.container} 
      onClick={handleContainerClick}
    >
      <input
        type="date"
        ref={dateInputRef}
        className={styles.hiddenInput}
        onChange={handleDateChange}
        value={selectedDate}
      />
      <div className={styles.customInput}>
        <span className={styles.placeholder}>
          {selectedDate ? new Date(selectedDate).toLocaleDateString('pt-BR') : 'Selecione o dia'}
        </span>
        <button className={styles.searchButton}>
          <svg 
            viewBox="0 0 24 24" 
            width="20" 
            height="20" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DateSelector;