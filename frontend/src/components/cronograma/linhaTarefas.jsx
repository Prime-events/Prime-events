// TaskList.js
import React from 'react';
import styles from './calendarioTarefa.module.css';

const LinhaTarefas = ({ tasks }) => {
  return (
    <div className={styles.taskListContainer}>
      <h3>Tarefas</h3>
      {tasks.length > 0 ? (
        tasks.map(task => (
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

export default LinhaTarefas;
