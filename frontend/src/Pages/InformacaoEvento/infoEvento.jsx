import React from 'react';
import styles from './infoEvento.module.css';
import SideBar from '../../components/sideBar/SideBar.jsx';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx';
import ImgCerimonia from '../../assets/img/imgCerimonia.png';
import ImgMapa from '../../assets/img/imgMapa.png';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

function InformacaoEvento() {
    return (
        <>
            <SegundoHeader titulo='Informações evento' />
            <div className={styles.container}>
                <SideBar />
                <div className={styles.containerInformacoes}>
                    {/* Seção Esquerda: Nome do evento, imagem do evento e mapa */}
                    <div className={styles.secaoEsquerda}>
                        <span className={styles.nomeEvento}>Festa de casamento</span>
                        <div className={styles.containereImagemEvento}>
                            <img className={styles.imagemEvento} src={ImgCerimonia} alt="Cerimônia" />
                        </div>
                        <div className={styles.containerImagemMapa}>
                            <img className={styles.imagemMapa} src={ImgMapa} alt="Mapa do local" />
                        </div>

                    </div>

                    {/* Seção Direita: Informações e botões */}
                    <div className={styles.secaoDireita}>
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
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Término:</span>
                                <span>20:00</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span>Localização:</span>
                                <span>Largo do Caranguejo, Itinga</span>
                            </div>
                        </div>
                        <div className={styles.descricao}>
                            <strong>Descrição:</strong>
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
