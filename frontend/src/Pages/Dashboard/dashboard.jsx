import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import SideBar from "../../components/sideBar/sideBar";
import Card from '../../components/card/card';
import style from './dashboard.module.css';

function Dashboard() {
    const [cards, setCards] = useState([
        { id: '1', color: 'green', icon: '✔️', number: '237', text: 'Eventos concluídos' },
        { id: '2', color: 'red', icon: '❌', number: '63', text: 'Eventos cancelados' },
        { id: '3', color: 'orange', icon: '📅', number: '300', text: 'Eventos Criados' },
    ]);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedCards = Array.from(cards);
        const [moved, Card] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, moved);
        setCards(reorderedCards);
    };

    return (
        <>
            <SegundoHeader titulo="Início" />
            <div className={style.container}>
                <SideBar />
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="grid" direction={isMobile ? "vertical" : "horizontal"}>
                        {(provided) => (
                            <div className={style.grid} {...provided.droppableProps} ref={provided.innerRef}>
                                {cards.map((card, index) => (
                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={style.card}
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
            </div>
        </>
    );
}

export default Dashboard;
