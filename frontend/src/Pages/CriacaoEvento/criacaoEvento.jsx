import { useState } from 'react';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx'
import styles from "./criacaoEvento.module.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function CriacaoEvento() {
    const [data, setData] = useState({
        nomeEvento: "",
        descricaoEvento: "",
        nomeLocal: "",
        dataHoraInicial: "",
        dataHoraFinal: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
    });
    const [date, setDate] = useState({
        dataEvento: "",
        horarioInicio: "",
        horarioTermino: "",
    });

    const handleDate = (e) => {
        const { name, value } = e.target;
        const newDate = { ...date, [name]: value };
            
        if (newDate.dataEvento && newDate.horarioInicio) {
            const [horaInicio, minutoInicio] = newDate.horarioInicio.split(":");
            const dataHoraInicial = new Date(newDate.dataEvento);
            dataHoraInicial.setHours(horaInicio, minutoInicio);
            setData((prevData) => ({ ...prevData, dataHoraInicial }));
        }

        if (newDate.dataEvento && newDate.horarioTermino) {
            const [horaTermino, minutoTermino] = newDate.horarioTermino.split(":");
            const dataHoraFinal = new Date(newDate.dataEvento);
            dataHoraFinal.setHours(horaTermino, minutoTermino);
            setData((prevData) => ({ ...prevData, dataHoraFinal }));
        }
        setDate(newDate);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return (<>
        <SegundoHeader titulo='Criar evento'/>
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
                                    <span className={styles.nomePreview}>{data.nomeEvento}</span>
                                    <span className={styles.descricaoPreview}>{data.descricaoEvento}</span>
                                    <span className={`${styles.dataHoraPreview}`}> {`Data: ${date.dataEvento}`}</span>
                                    <span className={`${styles.dataHoraPreview}`}>{`Início: ${date.horarioInicio}`}</span>
                                    <span className={`${styles.dataHoraPreview}`}>{`Término: ${date.horarioTermino}`} </span>
                                    <span className={styles.localizacaoPreview}>{`${data.nomeLocal} ${data.cep} ${data.rua} ${data.numero} ${data.complemento} ${data.bairro} ${data.cidade} ${data.estado}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.secaoDireita}>
                <div className={styles.itensDireita}>
                    <div className={styles.uploadImagem}><span>Adicionar Imagem</span></div>
                    <div className={styles.cardEvento}>
                        <span className={styles.tituloCardDireita}>Visão geral do Evento</span><br/>
                        <div className={styles.nomeEvento}>
                            <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        name="nomeEvento"
                                        value={data.nomeEvento}
                                        onChange={handleChange}
                                        className={data.nomeEvento ? styles.hasValue : ""}
                                    />
                                    <label className={styles.floatingLabel}>Nome do Evento</label>
                                </div>
                        </div>
                        <div className={styles.descricaoEvento}>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="descricaoEvento"
                                    value={data.descricaoEvento}
                                    onChange={handleChange}
                                    className={data.descricaoEvento ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Descrição do Evento</label>
                            </div>
                        </div>
                        <span className={styles.tituloCardDireita}>Data e Localização</span>
                        <div className={styles.dataHoraEvento}>
                            <span>Data</span>
                            <input
                                type="date"
                                name="dataEvento"
                                value={date.dataEvento}
                                onChange={handleDate}
                                className={date.dataEvento ? styles.hasValue : ""}
                            /><br/>
                            <span>Início</span>
                            <input
                                type="time"
                                name="horarioInicio"
                                value={date.horarioInicio}
                                onChange={handleDate}
                                className={date.horarioInicio ? styles.hasValue : ""}
                            /><br/>
                            <span>Término</span>
                            <input
                                type="time"
                                name="horarioTermino"
                                value={date.horarioTermino}
                                onChange={handleDate}
                                className={date.horarioTermino ? styles.hasValue : ""}
                            />
                        </div>

                        <div className={styles.localizacaoEvento}>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="nomeLocal"
                                    value={data.nomeLocal}
                                    onChange={handleChange}
                                    className={data.nomeLocal ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Nome do local</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="cep"
                                    value={data.cep}
                                    onChange={handleChange}
                                    className={data.cep ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>CEP</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="rua"
                                    value={data.rua}
                                    onChange={handleChange}
                                    className={data.rua ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Endereço</label>
                            </div>
                            <div className={styles.inputContainerRow}>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={data.numero}
                                        onChange={handleChange}
                                        className={data.numero ? styles.hasValue : ""}
                                    />
                                    <label className={styles.floatingLabel}>Número</label>
                                </div>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        name="complemento"
                                        value={data.complemento}
                                        onChange={handleChange}
                                        className={data.complemento ? styles.hasValue : ""}
                                    />
                                    <label className={styles.floatingLabel}>Complemento</label>
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="bairro"
                                    value={data.bairro}
                                    onChange={handleChange}
                                    className={data.bairro ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Bairro</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="cidade"
                                    value={data.cidade}
                                    onChange={handleChange}
                                    className={data.cidade ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Cidade</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="estado"
                                    value={data.estado}
                                    onChange={handleChange}
                                    className={data.estado ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Estado</label>
                            </div>
                        </div>
                        <div className={styles.map}></div>
                        <div className={styles.btnConcluirStyle}>
                        <button className={styles.btnConcluir}>Concluir</button></div>
                    </div>
                </div>
            </div>
        </div>

    </>);

}
export default CriacaoEvento;
