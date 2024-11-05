import { Calendar, Badge, List } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from './cronograma.module.css';

function getTodoList(date) {
    if (!date) return [];
    const day = date.getDate();
    switch (day) {
        case 10:
            return [{ time: '10:30 am', title: 'Meeting' }, { time: '12:00 pm', title: 'Lunch' }];
        case 15:
            return [
                { time: '09:30 pm', title: 'Products Introduction Meeting' },
                { time: '12:30 pm', title: 'Client entertaining' },
                { time: '02:00 pm', title: 'Product design discussion' },
                { time: '05:00 pm', title: 'Product test and acceptance' },
                { time: '06:30 pm', title: 'Reporting' }
            ];
        default:
            return [];
    }
}

function renderCell(date) {
    const list = getTodoList(date);
    return list.length ? <Badge className="calendar-todo-item-badge" /> : null;
}

const Cronograma = () => {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [componentsOrder, setComponentsOrder] = React.useState(['calendar', 'taskList']);
    const [isOpen, setIsOpen] = React.useState(true);

    const handleSelect = date => setSelectedDate(date);

    const handleDragEnd = result => {
        const { destination, source } = result;
        if (!destination) return;
        if (destination.index === source.index) return;

        const reorderedComponents = Array.from(componentsOrder);
        const [movedComponent] = reorderedComponents.splice(source.index, 1);
        reorderedComponents.splice(destination.index, 0, movedComponent);

        setComponentsOrder(reorderedComponents);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.sidebarWrapper} ${!isOpen ? styles.closed : ''}`}>
            <button 
                className={styles.toggleButton}
                onClick={toggleSidebar}
                aria-label={isOpen ? "Fechar sidebar" : "Abrir sidebar"}
            >
                {isOpen ? <IoIosArrowForward size={20} /> : <IoIosArrowBack size={20} />}
            </button>
            
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="components-droppable">
                    {(provided) => (
                        <div
                            className={styles.containerCronograma}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {componentsOrder.map((component, index) => (
                                <Draggable key={component} draggableId={component} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={component === 'calendar' ? styles.itemCalendario : styles.itemTaskList}
                                        >
                                            {component === 'calendar' ? (
                                                <Calendar 
                                                    compact 
                                                    renderCell={renderCell} 
                                                    onSelect={handleSelect} 
                                                    style={{ width: '100%' }} 
                                                />
                                            ) : (
                                                <TodoList date={selectedDate} />
                                            )}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

const TodoList = ({ date }) => {
    const list = getTodoList(date);
    
    if (!date) {
        return <p className={styles.emptyMessage}>Selecione uma data no calendário.</p>;
    }
    
    if (!list.length) {
        return <p className={styles.emptyMessage}>Nenhuma tarefa para essa data.</p>;
    }
    
    return (
        <List bordered>
            {list.map(item => (
                <List.Item key={item.time} index={item.time}>
                    <div>{item.time}</div>
                    <div>{item.title}</div>
                </List.Item>
            ))}
        </List>
    );
};

export default Cronograma;