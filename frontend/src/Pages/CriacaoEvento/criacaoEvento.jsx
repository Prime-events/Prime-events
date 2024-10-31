import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx'
import styles from "./criacaoEvento.module.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function CriacaoEvento() {

    return (<>
        <SegundoHeader />
        <div className={styles.containerCriacao}>
            <div className={styles.secaoEsquerda}>
                <div className={styles.itensEsquerda}>
                    <div className={styles.voltarEventos}>
                        <button className={styles.btnVoltar}><IoArrowBackCircleOutline />Voltar para eventos</button>
                    </div>
                    <div className={styles.preview}>
                        <div className={styles.itensPreview}>
                            <span className={styles.tituloPreview}>Pré-visualização</span>
                            <div className={styles.cardPreview}>
                                <div className={styles.itensCardPreview}>
                                    <span className={styles.nomePreview}>Nome do evento</span>
                                    <span className={styles.descricaoPreview}></span>
                                    <span className={styles.dataHoraPreview}></span>
                                    <span className={styles.localizacaoPreview}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.secaoDireita}>
                <div className={styles.itensDireita}>
                    <div className={styles.uploadImagem}></div>
                    <div className={styles.cardEvento}>
                        <span>Visão geral do Evento</span>
                        <div className={styles.nomeEvento}>
                            <span>Nome do evento<br/></span>
                            <span>Seja claro, com um título que diga às pessoas do que se trata seu evento.<br/></span>
                            <input></input>
                        </div>
                        <div className={styles.descricaoEvento}>
                            <span>Descrição do evento<br/></span>
                            <span>Chame a atenção das pessoas com uma breve descrição sobre seu evento.<br/></span>
                            <input></input>
                        </div>
                        <span>Data e localização</span>
                        <div className={styles.dataHoraEvento}>
                            <span>Data</span>
                            <span>Horário de início</span>
                            <span>Horário de término</span>
                        </div>
                        <div className={styles.localizacaoEvento}>
                            <span>Nome do local</span>
                            <input></input>
                            <span>CEP</span>
                            <input></input>
                            <span>Endereço</span>
                            <input></input>
                            <span>Numero</span>
                            <input></input>
                            <span>Complemento</span>
                            <input></input>
                            <span>Bairro</span>
                            <input></input>
                            <span>Cidade</span>
                            <input></input>
                            <span>Estado</span>
                            <input></input>
                        </div>
                        <div className={styles.map}></div>
                        <button className={styles.btnConcluir}>Concluir</button>
                    </div>
                </div>

            </div>

        </div>

    </>);

}
export default CriacaoEvento;
