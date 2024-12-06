import React, { useEffect, useRef, useState } from "react";
import styles from './TourDropdown.module.scss';

type Option  = {
  value: string | number,
  label: string,
}

type Props = {
  options: Option[],
  selected: string | number | null;
  onChange: (value: string | null) => void;
  label: string;
}

export const TourDropdown: React.FC<Props> = ({
  options,
  selected,
  onChange,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string | number) => {
    onChange(String(value));
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
      <button type="button" className={styles.dropdownButton} onClick={handleToggle}>
        {options.find(option => option.value === selected)?.label || 'Options'}
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