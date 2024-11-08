import { Link } from "react-router-dom";
import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import SideBar from "../../components/sideBar/sideBar";
import styles from "./eventos.module.css";
import { useState } from "react";

function Eventos(){
    const [isActive, setIsActive] = useState('eventos');

    const toggleActive = (state) => {
        setIsActive(state);
    }

    return (
        <>
            <SegundoHeader titulo="Eventos"/>
            <div className={styles.container}>
                <SideBar />
                <div className={styles.containerEventos}>
                    <div className={styles.cimaEvento}>
                        <span className={`${isActive === 'eventos' ? styles.active : ''}`} onClick={() => toggleActive('eventos')}>Eventos Pendentes</span>
                        <span className={`${isActive === 'concluido' ? styles.active : ''}`} onClick={() => toggleActive('concluido')}>Concluídos</span>
                    </div>
                    <div className={styles.meioEvento}>                        
                        <div className={styles.inputContainer}>
                            <input type="search" name="search" id={styles.search} placeholder="Buscar Eventos"/>
                            <svg className={styles.lupa} width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.6517 2.25C22.8117 2.25 28.6357 7.164 28.6357 13.2053C28.6357 16.0555 27.3393 18.6551 25.2179 20.6061L29.3923 24.1208C29.7829 24.4504 29.7843 24.9837 29.3936 25.3133C29.1989 25.4798 28.9416 25.5619 28.6856 25.5619C28.4309 25.5619 28.1749 25.4798 27.9789 25.3155L23.7542 21.7609C21.5318 23.2626 18.714 24.1616 15.6517 24.1616C8.49172 24.1616 2.66638 19.2465 2.66638 13.2053C2.66638 7.164 8.49172 2.25 15.6517 2.25ZM15.6517 3.9375C9.59438 3.9375 4.66638 8.09438 4.66638 13.2053C4.66638 18.3161 9.59438 22.4741 15.6517 22.4741C21.7077 22.4741 26.6357 18.3161 26.6357 13.2053C26.6357 8.09438 21.7077 3.9375 15.6517 3.9375Z" fill="#342626"/>
                            </svg>
                        </div>
                        <div className={styles.inputContainer}>    
                            <input type="date" name="" id="" />
                        </div>
                        <div className={styles.btnCriarStyle}>
                            <Link to={"/criarEvento"}>
                                <button>Criar Evento</button>
                            </Link>
                        </div>
                        
                    </div>
                    <div className={styles.baixoEvento}>  
                        <div className={styles.containerEvento}>
                            <span>Evento</span> 
                            <div className={styles.informacoesEvento}>         
                                <div className={styles.data}>
                                    <label className={styles.mesEvento}>Jan</label>
                                    <label className={styles.diaEvento}>24</label>
                                </div>
                                <div className={styles.imagem} style={{backgroundImage: `url(https://cdn.pixabay.com/photo/2016/09/19/21/50/sun-flower-1681385_640.jpg)`}}></div> 
                                <div className={styles.endereco}>
                                    <label className={styles.nomeEvento}>Nome do Evento</label>
                                    <label className={styles.infoEvento}>Endereço</label>
                                    <label className={styles.infoEvento}>Data e Hora</label>
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
                </div>
            </div>
        </>
    );
}

export default Eventos;
