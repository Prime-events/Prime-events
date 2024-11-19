import React from 'react';
import styles from './infoEvento.module.css';
import SideBar from '../../components/sideBar/SideBar.jsx';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx';
import ImgCerimonia from '../../assets/img/imgCerimonia.png';
import ImgMapa from '../../assets/img/imgMapa.png';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { TiLocation } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function InformacaoEvento() {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/eventos');
    };

    const handleOpenModal = () => {

    };

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
                                <button className={styles.btnEditar} onClick={handleOpenModal}><FaRegEdit style={{ fontSize: '1.4rem' }} />Editar informações</button>
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
                            <button className={styles.botao}>Lista de convidados</button>
                            <button className={styles.botao}>Orçamento</button>
                            <button className={styles.botao}>Cronograma</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InformacaoEvento;
