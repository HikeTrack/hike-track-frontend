import React, { useEffect, useRef, useState } from "react";
import { getNextMonthArrow, getPrevMonthArrow } from "../../utils/getIcons";
import styles from './CalendarFilter.module.scss';

export const CalendarFilter: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const prevMonthArrowIcon = getPrevMonthArrow();
  const nextMonthArrowIcon = getNextMonthArrow();

  const monthRef = useRef<HTMLSpanElement>(null);
  const yearRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLDivElement>(null);

  const adjustWeekdays = (day: number): number => {
    return (day === 0) ? 6 : day - 1;
  }

  useEffect(() => {
    createCalendar();
  }, [currentMonth, currentYear]);

  const createCalendar = (): void => {
    const monthsAll: string[] = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    if (daysRef.current && monthRef.current && yearRef.current) {
      monthRef.current.textContent = monthsAll[currentMonth];
      yearRef.current.textContent = currentYear.toString();

      const firstDay: number = adjustWeekdays(new Date(currentYear, currentMonth, 1).getDay());
      const daysInMonth: number = new Date(currentYear, currentMonth + 1, 0).getDate(); 

      daysRef.current.innerHTML = '';

      for (let i = 0; i < firstDay; i++) {
        const emptyDiv: HTMLDivElement = document.createElement('div');
        daysRef.current.appendChild(emptyDiv);
        emptyDiv.className = styles.day;
      }
  
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv: HTMLDivElement = document.createElement('div');
        dayDiv.textContent = day.toString();
        dayDiv.className = styles.day;
        
        daysRef.current.appendChild(dayDiv);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));

    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));

    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarTop}>
        <button className={styles.monthButton} onClick={handlePrevMonth}>
          <img src={prevMonthArrowIcon} />
        </button>
        <span className={styles.month} ref={monthRef}></span>
        <span className={styles.year} ref={yearRef}></span>
        <button className={styles.monthButton} onClick={handleNextMonth}>
          <img src={nextMonthArrowIcon} />
        </button>
      </div>
      <div className={styles.weekdays}>
        <div className={styles.workday}>Mon</div>
        <div className={styles.workday}>Tue</div>
        <div className={styles.workday}>Wed</div>
        <div className={styles.workday}>Thu</div>
        <div className={styles.workday}>Fri</div>
        <div className={styles.weekend}>Sat</div>
        <div className={styles.weekend}>Sun</div>
      </div>
      <div className={styles.days} ref={daysRef}></div>
    </div>
  )
}