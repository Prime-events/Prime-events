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
                            <input type="search" name="" id="" />
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
