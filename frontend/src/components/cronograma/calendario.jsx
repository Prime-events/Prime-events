// src/components/Calendario.jsx
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from './calendarioTarefa.module.css';

const Calendario = ({ onDateSelect, selectedDate, tasks }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleMonthChange = (increment) => {
    if (increment === 1) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

  const hasTask = (date) => tasks.some(task => task.date === date);

  const calendarDays = [...Array(firstDayOfMonth)].map((_, index) => (
    <div key={index} className={styles.emptyDay}></div>
  ));

  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    calendarDays.push(
      <div
        key={date}
        className={`${styles.day} ${date === selectedDate ? styles.selectedDay : ''}`}
        onClick={() => onDateSelect(date)}
      >
        {day}
        {hasTask(date) && <div className={styles.taskIndicator}></div>} {/* Bolinha verde */}
      </div>
    );
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.monthNavigation}>
        <IoIosArrowBack onClick={() => handleMonthChange(-1)} />
        <h2>{`${monthNames[currentMonth]} ${currentYear}`}</h2>
        <IoIosArrowForward onClick={() => handleMonthChange(1)} />
      </div>
      <div className={styles.dayNames}>
        {dayNames.map(day => (
          <div key={day} className={styles.dayName}>{day}</div>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {calendarDays}
      </div>
    </div>
  );
};

export default Calendario;
