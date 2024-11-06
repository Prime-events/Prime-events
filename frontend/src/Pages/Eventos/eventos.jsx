import { Link, useNavigate } from "react-router-dom";
import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import SideBar from "../../components/sideBar/sideBar";
import styles from "./eventos.module.css";

function Eventos(){

    return (
        <>
            <SegundoHeader titulo="Eventos"/>
            <div className={styles.container}>
                <SideBar />
                <div className={styles.containerEventos}>
                    <div className={styles.cimaEvento}>
                        <span>Eventos Pendentes</span>
                        <span>Concluídos</span>
                    </div>
                    <div className={styles.meioEvento}>
                        <input type="search" name="" id="" />
                        <input type="date" name="" id="" />
                        <div className={styles.btnCriarStyle}>
                        <Link to={"/criarEvento"}>
                            <button>Criar Evento</button>
                        </Link>
                        </div>
                    </div>
                    <div className={styles.baixoEvento}>  
                        <span>Evento</span>            
                        <span>Convidados</span>            
                        <span>Status</span>            
                    </div>
                </div>
            </div>
        </>
    );
}

export default Eventos;
