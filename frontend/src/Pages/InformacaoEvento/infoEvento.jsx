import React, { useEffect, useState } from 'react';
import styles from './infoEvento.module.css';
import SideBar from '../../components/sideBar/sideBar.jsx';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx';
import ImgCerimonia from '../../assets/img/imgCerimonia.png';
import ImgMapa from '../../assets/img/imgMapa.png';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { TiLocation } from "react-icons/ti";
import { FaRegEdit, FaLink } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/modal/Modal.jsx';
import { createConvidado, listarConvidadosEvento } from './api.js';
import { createTarefa } from './api.js';

import { Button, Form, Row, Col, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';


function InformacaoEvento() {
    const [isConvidadoOpen, setIsConvidadoOpen] = useState(false);
    const [convidadoInfo, setConvidadoInfo] = useState({
        nome: "",
        telefone: "",
    })
    const [convidados, setConvidados] = useState([]);

    const [timelineModal, setTimelineModal] = useState(false);
    const [tarefa, setTarefa] = useState({
        id_evento: "",
        nomeTarefa: "",
        data: "",
    });
    
    const [date, setDate] = useState({
        horario: ""
    });

    const handleDate = (e) => {
        const { name, value } = e.target;
        const newDate = { ...date, [name]: value };

        if (newDate.dataEvento && newDate.horarioInicio) {
            const [horaInicio, minutoInicio] = newDate.horarioInicio.split(":");
            const dataHoraInicial = new Date(newDate.dataEvento);
            dataHoraInicial.setHours(horaInicio, minutoInicio);
        }

        if (newDate.dataEvento && newDate.horarioTermino) {
            const [horaTermino, minutoTermino] = newDate.horarioTermino.split(":");
            const dataHoraFinal = new Date(newDate.dataEvento);
            dataHoraFinal.setHours(horaTermino, minutoTermino);
            setData((prevData) => ({ ...prevData, dataHoraFinal }));
        }
        setDate(newDate);
    }
    const navigate = useNavigate();

    const handleRedirect = () => {
        localStorage.removeItem('idEvento');
        navigate('/eventos');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConvidadoInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmitConvidado = async (e) => {
        if (convidadoInfo.nome == "") return;
        e.preventDefault();
        console.log(convidadoInfo);
        await createConvidado(convidadoInfo);
    }
    useEffect(() => {
        const fetchConvidados = async () => {
            try {
                const id_evento = localStorage.getItem('idEvento');
                setConvidadoInfo((prevData) => ({...prevData, id_evento: id_evento}));
                const data_convidados = await listarConvidadosEvento(id_evento);
                console.log('data:', data_convidados);
                setConvidados(data_convidados);

            } catch (error) {
                console.error('Erro:', error);
            }
        };
        fetchConvidados();
    }, []);
    
    const handleNavigateTimeline = () => {
        navigate('/timeline');
    };

    const handleTimelineModalOpen = () => {
        setTimelineModal(true);

    };

    const handleTimelineModalClose = () => {
        setTimelineModal(false);
    };

    const handleCadastrarTarefa = async (e) => {
        e.preventDefault();
        const id = localStorage.getItem('idEvento');
        await createTarefa(id, tarefa);
    }

    return (
        <>
            <SegundoHeader titulo='Informações evento' />
            <div className={styles.container}>
                <SideBar />
                <div className={styles.containerInformacoes}>
                    <div className={styles.secaoEsquerda}>
                        <div className={styles.voltarEventos}>
                            <button className={styles.btnVoltar} onClick={handleRedirect}><IoArrowBackCircleOutline />Voltar para eventos</button>
                        </div>
                        <div className={styles.containereImagemEvento}>
                            <img className={styles.imagemEvento} src={ImgCerimonia} alt="Cerimônia" />
                        </div>
                        <div className={styles.containerImagemMapa}>
                            <img className={styles.imagemMapa} src={ImgMapa} alt="Mapa do local" />
                        </div>

                    </div>

                    {/* Seção Direita: Informações e botões */}
                    <div className={styles.secaoDireita}>
                        <div className={styles.itensTopoSecao}>
                            <span className={styles.nomeEvento}>Festa de casamento</span>
                            <div className={styles.editarInformacoes}>
                                <button className={styles.btnEditar}><FaRegEdit style={{ fontSize: '1.4rem' }} />Editar informações</button>
                                <button className={styles.btnEditar} ><FaRegEdit style={{ fontSize: '1.4rem' }} />Editar informações</button>
                            </div>
                        </div>

                        <div className={styles.infoEvento}>
                            <div className={styles.infoItem}>
                                <FaCalendarAlt className={styles.icon} />
                                <span>Data:</span>
                                <span>24/01/2025</span>
                            </div>
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Início:</span>
                                <span>16:00</span>
                            </div>
                            <div className={styles.infoItemLocalizacao}>
                                <TiLocation className={styles.icon} style={{ fontSize: '2rem', marginLeft: '-5px' }} />
                                <span>Localização: </span>
                                <span>Largo do Caranguejo, Itinga</span>
                            </div>
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Término:</span>
                                <span>20:00</span>
                            </div>
                        </div>
                        <div className={styles.descricao}>
                            <div className={styles.legendaDescricao}><strong>Descrição:</strong></div>
                            <p>Durante a cerimônia, os noivos, vestidos com trajes inspirados em contos de fadas, trocam votos sob um arco floral, ao som suave de uma harpa. Após a cerimônia, os convidados desfrutam de um banquete com mesas adornadas com toalhas de cetim e pratos gourmet.</p>
                        </div>
                        <div className={styles.botoes}>
                            <button className={styles.botao} onClick={() => setIsConvidadoOpen(true)} >Lista de convidados</button>
                            <button className={styles.botao}>Orçamento</button>
                            <button className={styles.botao} onClick={handleTimelineModalOpen}>Cronograma</button>
                        </div>
                    </div>
                </div>
                <Modal open={isConvidadoOpen} onClose={() => setIsConvidadoOpen(false)}>
                    
                    <div className={styles.containerModalConvidado}>
                        <div className={styles.tituloModal}>
                            Lista de convidados
                        </div>
                        <div className={styles.inputContainerRow}>
                            <div className={styles.inputContainer}>    
                                <input
                                    type='text'
                                    name='nome'
                                    value={convidadoInfo.nome}
                                    onChange={handleChange}
                                    maxLength={40}
                                    className={convidadoInfo.nome ? styles.hasValue : ""}
                                    ></input>
                                <label className={styles.floatingLabel}>Nome: </label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type='text'
                                    name='telefone'
                                    value={convidadoInfo.telefone}
                                    onChange={handleChange}
                                    maxLength={11}
                                    className={convidadoInfo.telefone ? styles.hasValue : ""}
                                    ></input>
                                <label className={styles.floatingLabel}>Telefone: </label>
                            </div>
                        </div>
                        <button onClick={handleSubmitConvidado}>Adicionar Convidado</button> <button>Gerar Link <FaLink/></button>
                        <div className={styles.containerTabela}>
                            <table className={styles.containerConvidados}>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Presença</th>
                                {/*map lista*/}
                                {convidados.map((convidado) => (
                                <tr key={convidado.id_convidado}>
                                    <td>{convidado.nome}</td>
                                    <td>{convidado.telefone}</td>
                                    <td>{convidado.presenca}</td>
                                </tr>
                                ))}
                            </table>
                        </div>
                </div>
                    
                </Modal>
            

                <Modal
                    isOpen={timelineModal}
                    toggle={handleTimelineModalClose}
                    className={styles.timeLineModal}
                    centered
                >
                    <div className={styles.modalContainer}>
                        <ModalHeader toggle={handleTimelineModalClose} className={styles.headerConfiguracoes}>
                            Timeline do evento
                        </ModalHeader>
                        <ModalBody>
                            <div className={styles.secoes}>
                                <div className={styles.secaoEsquerda}>
                                    <span className={styles.tituloCronograma}>Cronograma do Evento</span>
                                    <div className={styles.itensSecaoEsq}>
                                        <div className={styles.itensHorario}>
                                            <span>Horário</span>
                                            <input
                                                type="time"
                                                name="horario"
                                                value={date.horario}
                                                onChange={handleDate}
                                                className={date.horario ? styles.hasValue : ""}
                                            />
                                        </div>
                                        <Form className={styles.formularioTarefa}>
                                            <Row>
                                                <FormGroup className={styles.formTarefa}>
                                                    <Label for="exampleTarefa">Descrição da tarefa *</Label>
                                                    <Input
                                                        className={styles.inputTarefa}
                                                        id="exampleTarefa"
                                                        name="tarefa"
                                                        type="text"
                                                        required
                                                        maxLength={25}
                                                        placeholder={tarefa.nomeTarefa}
                                                        value={tarefa.nomeTarefa}
                                                        onChange={e => setTarefa(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Row>
                                            <button className={styles.btnAdicionarTarefa} onClick={handleCadastrarTarefa}>Adicionar</button>
                                        </Form>

                                    </div>
                                </div>
                                <div className={styles.secaoDireita}>
                                    <Timeline position="horizontal">
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                09:30 am
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>Início do evento</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                10:00 am
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>Início da cerimonia</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                12:00 pm
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>Fim da cerimonia</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                9:00 pm
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                            </TimelineSeparator>
                                            <TimelineContent>Encerramento do evento</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                9:00 pm
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                            </TimelineSeparator>
                                            <TimelineContent>Encerramento do evento</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                9:00 pm
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                            </TimelineSeparator>
                                            <TimelineContent>Encerramento do evento</TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                </div>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>
            </div >
        </>
    );
}

export default InformacaoEvento;
