import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import SideBar from "../../components/sideBar/sideBar";
import Card from '../../components/card/card';
import styles from './dashboard.module.css';
import Cronograma from '../../components/cronograma/cronograma';
import { useNavigate } from 'react-router-dom';
import { listarEventosPendentes } from './dashApi';
import { listarConvidadosEvento } from "../../components/listaConvidados/api";
import { getUser } from '../../components/header/segundoHeader/api';
import naoEncontrado from '../../assets/img/undraw_No_data_re_kwbl.png'
const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function Dashboard() {
    const [convidadosPorEvento, setConvidadosPorEvento] = useState({});
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();
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
        const [moved] = reorderedCards.splice(result.source.index, 1);
        reorderedCards.splice(result.destination.index, 0, moved);
        setCards(reorderedCards);
    };

    useEffect(() => {

        fetchEventos();
    }, []);

    useEffect(() => {
        if (eventos.length > 0) {
            eventos.forEach((evento) => {
                fetchNumeroConvidados(evento.id_evento);
            });
        }
    }, [eventos]);

    const fetchEventos = async () => {
        try {
            const email = localStorage.getItem('email');
            const data_usuario = await getUser(email);
            const { id_usuario } = data_usuario;

            // Log para verificar o id_usuario
            console.log('id_usuario:', id_usuario);

            const data_eventos = await listarEventosPendentes(id_usuario);

            // Log para verificar os eventos retornados
            console.log('data_eventos:', data_eventos);

            setEventos(data_eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };
    const fetchNumeroConvidados = async (id_evento) => {
        try {
            const convidados = await listarConvidadosEvento(id_evento);
            setConvidadosPorEvento((prev) => ({
                ...prev,
                [id_evento]: convidados.length,
            }));
        } catch (error) {
            console.error('Erro ao buscar convidados:', error);
        }
    }

    const handleRedirect = (id_evento) => {
        localStorage.setItem('idEvento', id_evento);
        navigate('/informacaoEvento');
    }


    return (
        <>
            <SegundoHeader titulo="Início" />
            <div className={styles.container}>
                <SideBar />
                <div className={styles.containerCriacao}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="grid" direction={isMobile ? "vertical" : "horizontal"}>
                            {(provided) => (
                                <div className={styles.grid} {...provided.droppableProps} ref={provided.innerRef}>
                                    {cards.map((card, index) => (
                                        <Draggable key={card.id} draggableId={card.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={styles.card}
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

                    <div className={styles.tabelaEventosPendentes}>
                        <div className={styles.evtRecentes}>
                            <span className={styles.EventosRecentes}>Eventos recentes</span>
                        </div>
                        {eventos.length === 0 ? ( // Verifica se não há eventos
                            <div className={styles.naoEncontrado}>
                                <span className={styles.textoNaoEncontrado} style={{ fontSize: '1.2rem' }}>Não há eventos pendentes</span>
                                <img
                                    src={naoEncontrado}
                                    alt="Nenhum evento pendente encontrado"
                                    className={styles.imagemNaoEncontrado}
                                />
                            </div>
                        ) : (
                            <div className={styles.containerEventos}>
                                <table className={styles.tabelaEventoStyle}>
                                    <thead>
                                        <tr>
                                            <th>Eventos</th>
                                            <th>Convidados</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventos.map((evento) => (
                                            <tr key={evento.id_evento}>
                                                <td>
                                                    <div className={styles.informacoesEvento}>
                                                        <div className={styles.data}>
                                                            <label className={styles.mesEvento}>{mesesAbreviados[new Date(evento.dataHoraInicial).getMonth()]}</label>
                                                            <label className={styles.diaEvento}>{new Date(evento.dataHoraInicial).getDate()}</label>
                                                        </div>
                                                        <div className={styles.imagem} style={{ backgroundImage: evento.imagemUrl }}></div>
                                                        <div className={styles.endereco}>
                                                            <label className={styles.nomeEvento} onClick={() => handleRedirect(evento.id_evento)}>{evento.nomeEvento}</label>
                                                            {evento.dataHoraInicial == undefined ? '' : <label className={styles.infoEvento}>{`${new Date(evento.dataHoraInicial).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} -
                                                        ${evento.dataHoraFinal == undefined ? '' : new Date(evento.dataHoraFinal).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}</label>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={styles.numeroConvidados}>{convidadosPorEvento[evento.id_evento]}</div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                </div>
                <div>
                    <Cronograma />
                </div>
            </div>
        </>
    );
}

export default Dashboard;
