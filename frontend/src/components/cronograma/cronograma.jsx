import { Calendar, Badge, List } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import ptBR from 'rsuite/locales/pt_BR';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from './cronograma.module.css';
import NotFound from '../../assets/img/notfound.png';
import EscolhaDataImagem from '../../assets/img/escolhaData.png';
import { buscarTarefas } from './cronogramaAPI';
import { listarEventosPendentes } from '../../Pages/Dashboard/dashApi';
import { getUser } from '../header/segundoHeader/api';

const Cronograma = ({ id_usuario }) => {
    const [eventos, setEventos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvento, setSelectedEvento] = useState(null);
    const [tarefas, setTarefas] = useState([]);
    const [componentsOrder, setComponentsOrder] = useState(['calendar', 'taskList']);
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                setIsLoading(true);
                const email = localStorage.getItem('email');
                const data_usuario = await getUser(email);
                const { id_usuario } = data_usuario;
                console.log("ID do usuário:", id_usuario);
                const eventosData = await listarEventosPendentes(id_usuario);
                console.log("Eventos encontrados:", eventosData);
                setEventos(eventosData);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const handleSelect = async (date) => {
        setSelectedDate(date);
        console.log("Data selecionada:", date);
        console.log("Eventos disponíveis:", eventos);
    
        // Find the evento that matches the selected date
        const eventoSelecionado = eventos.find(evento => {
            // Usar dataHoraInicial ou criar uma data a partir da string
            const eventoDate = new Date(evento.dataHoraInicial || evento.data);
            

            console.log("Comparando datas:", 
                "Evento: ", eventoDate, 
                "Selecionada: ", date
            );
            
            // Comparar ano, mês e dia
            return (
                eventoDate.getFullYear() === date.getFullYear() &&
                eventoDate.getMonth() === date.getMonth() &&
                eventoDate.getDate() === date.getDate()
            );
        });
    
        console.log("Evento selecionado:", eventoSelecionado);
    
        if (eventoSelecionado) {
            try {
                const tarefasData = await buscarTarefas(eventoSelecionado.id_evento);
                console.log("Tarefas encontradas:", tarefasData);
                setSelectedEvento(eventoSelecionado);
                setTarefas(tarefasData);
            } catch (err) {
                setSelectedEvento(eventoSelecionado); // Mantém o evento mesmo sem tarefas
                setTarefas([]); // Limpa tarefas
            }
        } else {
            setSelectedEvento(null);
            setTarefas([]);
        }
    };
    
    
    // Modificar também o renderCell
    const renderCell = (date) => {
        // Highlight dates with eventos
        const hasEvento = eventos.some(evento => {
            const eventoDate = new Date(evento.dataHoraInicial || evento.data);
            return (
                eventoDate.getFullYear() === date.getFullYear() &&
                eventoDate.getMonth() === date.getMonth() &&
                eventoDate.getDate() === date.getDate()
            );
        });
    
        return hasEvento ? <Badge className="calendar-todo-item-badge" /> : null;
    };

    const handleDragEnd = (result) => {
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

    const localeConfig = {
        sunday: 'Dom',
        monday: 'Seg',
        tuesday: 'Ter',
        wednesday: 'Qua',
        thursday: 'Qui',
        friday: 'Sex',
        saturday: 'Sáb',
        ok: 'OK',
        today: 'Hoje',
        yesterday: 'Ontem',
        hours: 'Horas',
        minutes: 'Minutos',
        seconds: 'Segundos',
        formattedMonthPattern: 'MMMM yyyy',
        formattedDayPattern: 'dd/MM/yyyy',
        ...ptBR
    };

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error}</div>;
    }

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
                                                    locale={localeConfig}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                <TodoList
                                                    date={selectedDate}
                                                    evento={selectedEvento}
                                                    tarefas={tarefas}
                                                />
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

const TodoList = ({ date, evento, tarefas }) => {
    if (!date) {
        return (
            <div className={styles.escolhaDataContainer}>
                <p className={styles.escolhaData}>Selecione uma data no calendário.</p>
                <img
                    src={EscolhaDataImagem}
                    alt="Escolha uma data"
                    className={styles.EscolhaDataImagem}
                />
            </div>
        )
    }

    if (!evento) {
        return (
            <div className={styles.emptyStateContainer}>
                <p className={styles.emptyMessage}>Nenhum evento encontrado para essa data.</p>
                <img
                    src={NotFound}
                    alt="Nenhum evento encontrado"
                    className={styles.notFoundImage}
                />
            </div>
        );
    }

    if (!tarefas.length) {
        return (
            <div className={styles.emptyStateContainer}>
                <p className={styles.emptyMessage}>Nenhuma tarefa para esse evento.</p>
                <img
                    src={NotFound}
                    alt="Nenhuma tarefa encontrada"
                    className={styles.notFoundImage}
                />
            </div>
        );
    }

    return (
        <div>
            <List bordered>
                {tarefas.map((tarefa, index) => (
                    <List.Item key={`${tarefa.id}-${index}`} index={index}>
                        <div><strong>Nome do Evento:</strong> {evento.nomeEvento}</div> 
                        <div><strong>Horário:</strong> {tarefa.horario}</div>
                        <div><strong>Descrição:</strong> {tarefa.descricao}</div>
                    </List.Item>
                ))}
            </List>
        </div>
    );
};

export default Cronograma;