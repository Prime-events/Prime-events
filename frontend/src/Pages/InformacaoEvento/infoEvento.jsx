import React, { useEffect, useState } from 'react';
import styles from './infoEvento.module.css';
import SideBar from '../../components/sideBar/SideBar.jsx';
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


function InformacaoEvento() {
    const [isConvidadoOpen, setIsConvidadoOpen] = useState(false);
    const [convidadoInfo, setConvidadoInfo] = useState({
        id_evento: "",
        nome: "",
        telefone: "",
    })
    const [convidados, setConvidados] = useState([]);

    const navigate = useNavigate();

    const handleRedirect = () => {
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
                            <button className={styles.botao}>Cronograma</button>
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
                    
                </Modal>
            </div>
        </>
    );
}

export default InformacaoEvento;
