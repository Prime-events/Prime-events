import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import SideBar from "../../components/sideBar/SideBar";
import Card from '../../components/card/card';
import styles from './dashboard.module.css';
import Cronograma from '../../components/cronograma/cronograma';
import { useNavigate } from 'react-router-dom';
import { listarEventosPendentes } from './dashApi';
import { getUser } from '../../components/header/segundoHeader/api';
import naoEncontrado from '../../assets/img/undraw_No_data_re_kwbl.png'
const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function Dashboard() {
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
        const fetchEventos = async () => {
            try {
                const email = localStorage.getItem('email');
                const data_usuario = await getUser(email);
                const { id_usuario } = data_usuario;
                const data_eventos = await listarEventosPendentes(id_usuario);
                console.log('data:', data_eventos);
                const eventosComUrl = data_eventos.map((evento) => {
                    if (evento.imagem) {
                        const blob = new Blob([evento.imagem], { type: 'image/jpeg' });
                        evento.imagemUrl = URL.createObjectURL(blob);
                        console.log(evento.imagemUrl);
                    }
                    return evento;
                });

                setEventos(eventosComUrl);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchEventos();
    }, []);

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
                        {eventos.length === 0 ? ( // Verifica se não há eventos
                            <div className={styles.naoEncontrado}>
                                <span className={styles.textoNaoEncontrado} style={{fontSize: '1.2rem'}}>Não há eventos pendentes</span>
                                <img
                                    src={naoEncontrado}
                                    alt="Nenhum evento pendente encontrado"
                                    className={styles.imagemNaoEncontrado}
                                />
                            </div>
                        ) : (
                            <div className={styles.containerEventos}>
                                {eventos.map((evento) => (
                                    <div key={evento.id_evento} className={styles.baixoEvento}>
                                        <div className={styles.containerEventoInfo}>
                                            <span>Evento</span>
                                            <div className={styles.informacoesEvento}>
                                                <div className={styles.data}>
                                                    <label className={styles.mesEvento}>{mesesAbreviados[new Date(evento.dataHoraInicial).getMonth()]}</label>
                                                    <label className={styles.diaEvento}>{new Date(evento.dataHoraInicial).getDate()}</label>
                                                </div>
                                                <div className={styles.imagem} style={{ backgroundImage: evento.imagemUrl }}></div>
                                                <div className={styles.endereco}>
                                                    <label className={styles.nomeEvento}>{evento.nomeEvento}</label>
                                                    <label className={styles.infoEvento}>{`${evento.nomeLocal}`}</label>
                                                    <label className={styles.infoEvento}>{`${evento.rua} ${evento.numero} ${evento.complemento} ${evento.bairro} ${evento.cidade}`}</label>
                                                    <label className={styles.infoEvento}>{`${new Date(evento.dataHoraInicial).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - 
                                    ${new Date(evento.dataHoraFinal).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.containerConvidados}>
                                            <span>Convidados</span>
                                            <div className={styles.numeroConvidados}>50</div>
                                        </div>
                                        <div className={styles.containerStatus}>
                                            <span>Status</span>
                                            <div className={styles.status}>Em Progresso</div>
                                        </div>
                                    </div>
                                ))}
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
