import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';
import Card from '../../components/card/card';
import style from './dashboard.module.css';

function Dashboard() {
    const [cards, setCards] = useState([
        { id: '1', color: 'green', icon: '✔️', number: '237', text: 'Eventos concluídos' },
        { id: '2', color: 'red', icon: '❌', number: '63', text: 'Eventos cancelados' },
        { id: '3', color: 'orange', icon: '📅', number: '300', text: 'Eventos Criados' },
    ]);
    
    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const reorderedCards = Array.from(cards);
        const [movedCard] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, movedCard);
        setCards(reorderedCards);
    };

    return (
        <>
            <SegundoHeader titulo="Dashboard" />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="grid" direction="horizontal">
                    {(provided) => (
                        <div className={style.grid} {...provided.droppableProps} ref={provided.innerRef}>
                            {cards.map((card, index) => (
                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card color={card.color} icon={card.icon} number={card.number} text={card.text} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
} 

export default Dashboard;