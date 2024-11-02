// src/components/TaskList.jsx
import React from "react";
import styles from './calendarioTarefa.module.css';

const TaskList = ({ tasks, selectedDate }) => {
  const filteredTasks = tasks.filter(task => task.date === selectedDate);

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

export default TaskList;
