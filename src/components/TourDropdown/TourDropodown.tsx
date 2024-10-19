import React, { useState } from "react";
import styles from './TourDropdown.module.scss';

type Option  = {
  value: string,
  label: string,
}

type Props = {
  options: Option[],
  selected: string | null;
  onChange: (value: string) => void;
  label: string;
}

export const TourDropdown: React.FC<Props> = ({
  options,
  selected,
  onChange,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={handleToggle}>
        {options.find(option => option.value === selected)?.label || 'Choose an option'}
      </button>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map(option => (
            <li 
              className={styles.dropdownItem}
              key={option.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
