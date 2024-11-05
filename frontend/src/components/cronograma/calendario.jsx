import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Importando os ícones
import styles from './calendarioTarefa.module.css';

function Calendario() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Exemplo de lista de tarefas
  const tasks = [
    { id: 1, date: '2024-11-03', title: 'Enem', time: '13:30 - 19:30', description: 'Duração da prova' },
    { id: 2, date: '2024-11-10', title: 'Chamada com Cliente Terk', time: '09:30 - 10:00', description: '' },
    { id: 3, date: '2024-11-03', title: 'Reunião Equipe', time: '10:00 - 11:00', description: 'Alinhamento de projeto' },
    { id: 3, date: '2024-11-03', title: 'Reunião Equipe', time: '10:00 - 11:00', description: 'Alinhamento de projeto' },
    { id: 3, date: '2024-11-07', title: 'Reunião Equipe', time: '10:00 - 11:00', description: 'Alinhamento de projeto' },
    { id: 3, date: '2024-11-22', title: 'Reunião Equipe', time: '10:00 - 11:00', description: 'Alinhamento de projeto' },
 
  ];

  const filteredTasks = tasks.filter(task => task.date === selectedDate);

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

  const Calendar = () => {
    const handleDateClick = (date) => {
      setSelectedDate(date);
    };

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Cria um conjunto de datas com tarefas para fácil verificação
    const taskDates = new Set(tasks.map(task => task.date));

    const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

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
          {[...Array(firstDayOfMonth)].map((_, index) => (
            <div key={index} className={styles.emptyDay}></div>
          ))}
          {[...Array(daysInMonth)].map((_, index) => {
            const day = index + 1;
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = date === selectedDate;
            const hasTask = taskDates.has(date);

            return (
              <div
                key={date}
                className={`${styles.day} ${isSelected ? styles.selectedDay : ''} ${hasTask ? styles.taskIndicator : ''}`}
                onClick={() => handleDateClick(date)}
              >
                {day}
                {hasTask && <div className={styles.taskDot}></div>} {/* Adiciona o ponto verde se tiver tarefa */}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const TaskList = () => {
    return (
      <div className={styles.taskListContainer}>
        <div className={styles.tituloTarefa}>
          <span className={styles.txtTituloTarefa}>Tarefas para {selectedDate || 'Selecione uma data'}</span>
        </div>

        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className={styles.task}>
              <div className={styles.taskTitle}>{task.title}</div>
              <div className={styles.taskTime}>{task.time}</div>
              <div className={styles.taskDescription}>{task.description}</div>
            </div>
          ))
        ) : (
          <p>Nenhuma tarefa para essa data.</p>
        )}
      </div>
    );
  };

  return (
    <div className={styles.appContainer}>
      <div className={`${styles.sidebar} ${isSidebarVisible ? styles.sidebarVisible : ''}`}>
        {isSidebarVisible ? (
          <IoIosArrowForward
            className={styles.closeIcon}
            onClick={() => setIsSidebarVisible(false)} // Fecha a sidebar ao clicar
          />
        ) : (
          <IoIosArrowBack
            className={styles.openIcon}
            onClick={() => setIsSidebarVisible(true)} // Abre a sidebar ao clicar
          />
        )}
        <div className={styles.container}>
          <Calendar />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default Calendario;