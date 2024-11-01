// CalendarTask.js
import React, { useState } from 'react';
import Calendario from './calendario';
import LinhaTarefas from './linhaTarefas';
import styles from './calendarioTarefa.module.css';

const CalendarioTarefas = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Exemplo de dados de tarefas
  const tasks = [
    { id: 1, date: '2022-11-28', title: 'Casamento', time: '09:00 - 09:30', description: 'início evento' },
    { id: 2, date: '2022-11-28', title: 'Terk Client Call', time: '09:30 - 10:00', description: '' },
    // Outras tarefas...
  ];

  // Filtra as tarefas de acordo com a data selecionada
  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  return (
    <div className={styles.calendarTaskContainer}>
      <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <LinhaTarefas tasks={filteredTasks} />
    </div>
  );
};

export default CalendarioTarefas;
