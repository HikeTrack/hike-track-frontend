import React, { useEffect, useRef, useState } from "react";
import { getNextMonthArrow, getPrevMonthArrow } from "../../utils/getIcons";
import styles from './CalendarFilter.module.scss';

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: (start: Date | null, end: Date | null) => void;
}

export const CalendarFilter: React.FC<Props> = ({
  startDate,
  endDate,
  handleDateChange
}) => {
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
  }, [currentMonth, currentYear, startDate, endDate]);

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

        const isSelected = isDaySelected(day);
        const isInRange = isDayInRange(day);

        dayDiv.className = `${styles.day} ${isSelected ? styles.isSelected : ''} ${isInRange ? styles.isInRange : ''}`;
        
        dayDiv.addEventListener('click', () => handleDayClick(day));

        daysRef.current.appendChild(dayDiv);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }

      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }

      return prev + 1;
    });
  };

  const isDaySelected = (day: number): boolean => {
    const isStartDateSelected = !!(startDate
      && startDate.getFullYear() === currentYear 
      && startDate.getMonth() === currentMonth
      && startDate.getDate() === day);

    const isEndDateSelected = !!(endDate
      && endDate.getFullYear() === currentYear 
      && endDate.getMonth() === currentMonth
      && endDate.getDate() === day);

    return isStartDateSelected || isEndDateSelected;
  };

  const isDayInRange = (day: number): boolean => {
    if (startDate && endDate) {
      const currentDate = new Date(currentYear, currentMonth, day);

      return currentDate > startDate && currentDate < endDate;
    }

    return false;
  }

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);

    if (!startDate) {
      handleDateChange(selectedDate, null);
    } else if (startDate && !endDate) {
      if (selectedDate >= startDate) {
        handleDateChange(startDate, selectedDate);
      } else {
        handleDateChange(selectedDate, null);
      }
    } else {
      handleDateChange(selectedDate, null);
    }
  }

  console.log(startDate, endDate);

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