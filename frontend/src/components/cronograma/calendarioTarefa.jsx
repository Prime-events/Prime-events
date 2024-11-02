// src/components/CalendarioTarefa.jsx
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Calendario from "./calendario";
import TaskList from "./linhaTarefas";
import styles from './calendarioTarefa.module.css';

function CalendarioTarefa() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Data atual no formato 'YYYY-MM-DD'
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [componentsOrder, setComponentsOrder] = useState(['calendario', 'taskList']);

  const tasks = [
    { id: 1, date: '2024-11-03', title: 'Enem', time: '13:30 - 19:30', description: 'Duração da prova' },
    { id: 2, date: '2024-11-10', title: 'Chamada com Cliente Terk', time: '09:30 - 10:00', description: '' },
    { id: 3, date: '2024-11-03', title: 'Reunião Equipe', time: '10:00 - 11:00', description: 'Alinhamento de projeto' },
    // Remova a tarefa duplicada ou altere o id se necessário.
  ];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedComponents = Array.from(componentsOrder);
    const [removed] = reorderedComponents.splice(result.source.index, 1);
    reorderedComponents.splice(result.destination.index, 0, removed);

    setComponentsOrder(reorderedComponents);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.appContainer}>
        <div className={`${styles.sidebar} ${isSidebarVisible ? styles.sidebarVisible : ''}`}>
          {isSidebarVisible ? (
            <IoIosArrowForward
              className={styles.closeIcon}
              onClick={() => setIsSidebarVisible(false)}
            />
          ) : (
            <IoIosArrowBack
              className={styles.openIcon}
              onClick={() => setIsSidebarVisible(true)}
            />
          )}
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.container}
              >
                {componentsOrder.map((component, index) => (
                  <Draggable key={component} draggableId={component} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${styles.innerContainer} ${snapshot.isDragging ? styles.dragging : ''}`}
                      >
                        {component === 'calendario' ? (
                          <Calendario selectedDate={selectedDate} onDateSelect={setSelectedDate} tasks={tasks} />
                        ) : (
                          <TaskList tasks={tasks} selectedDate={selectedDate} />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
}

export default CalendarioTarefa;
