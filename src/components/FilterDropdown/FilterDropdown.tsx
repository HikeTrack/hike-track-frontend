import React, { useEffect, useRef, useState } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string | number) => {
    if (typeof value === 'string' || typeof value === 'number') {
      onChange(value);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
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
