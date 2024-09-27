import React, { useState } from "react";
import styles from './FilterDropdown.module.scss';

type Option  = {
  value: string | number,
  label: string,
}

type Props = {
  options: Option[],
  selected: string | number | null;
  onChange: (value: string | number) => void;
  label: string;
}

export const FilterDropdown: React.FC<Props> = ({
  options,
  selected,
  onChange,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={handleToggle}>
        {options.find(option => option.value === selected)?.label || '--'}
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
