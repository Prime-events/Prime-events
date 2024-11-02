import { useState } from 'react';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx'
import styles from "./criacaoEvento.module.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

function CriacaoEvento() {
    const [endereco, setEndereco] = useState({
        nomeLocal: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
    });



    const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prevValues) => ({
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
                    <div className={styles.uploadImagem}><span>Adicionar Imagem</span></div>
                    <div className={styles.cardEvento}>
                        <span className={styles.tituloCardDireita}>Visão geral do Evento</span><br/>
                        <div className={styles.nomeEvento}>
                            <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        name="nomeEvento"
                                        value={endereco.nomeEvento}
                                        onChange={handleChange}
                                        className={endereco.nomeEvento ? styles.hasValue : ""}
                                    />
                                    <label className={styles.floatingLabel}>Nome do Evento</label>
                                </div>
                        </div>
                        <div className={styles.descricaoEvento}>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="descricaoEvento"
                                    value={endereco.descricaoEvento}
                                    onChange={handleChange}
                                    className={endereco.descricaoEvento ? styles.hasValue : ""}
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
                                value={endereco.dataEvento}
                                onChange={handleChange}
                                className={endereco.dataEvento ? styles.hasValue : ""}
                            /><br/>
                            <span>Início</span>
                            <input
                                type="time"
                                name="horarioInicio"
                                value={endereco.horarioInicio}
                                onChange={handleChange}
                                className={endereco.horarioInicio ? styles.hasValue : ""}
                            /><br/>
                            <span>Término</span>
                            <input
                                type="time"
                                name="horarioTermino"
                                value={endereco.horarioTermino}
                                onChange={handleChange}
                                className={endereco.horarioTermino ? styles.hasValue : ""}
                            />
                        </div>

                        <div className={styles.localizacaoEvento}>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="nomeLocal"
                                    value={endereco.nomeLocal}
                                    onChange={handleChange}
                                    className={endereco.nomeLocal ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Nome do local</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="cep"
                                    value={endereco.cep}
                                    onChange={handleChange}
                                    className={endereco.cep ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>CEP</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="rua"
                                    value={endereco.rua}
                                    onChange={handleChange}
                                    className={endereco.rua ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Endereço</label>
                            </div>
                            <div className={styles.inputContainerRow}>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={endereco.numero}
                                        onChange={handleChange}
                                        className={endereco.numero ? styles.hasValue : ""}
                                    />
                                    <label className={styles.floatingLabel}>Número</label>
                                </div>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        name="complemento"
                                        value={endereco.complemento}
                                        onChange={handleChange}
                                        className={endereco.complemento ? styles.hasValue : ""}
                                    />
                                    <label className={styles.floatingLabel}>Complemento</label>
                                </div>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="bairro"
                                    value={endereco.bairro}
                                    onChange={handleChange}
                                    className={endereco.bairro ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Bairro</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="cidade"
                                    value={endereco.cidade}
                                    onChange={handleChange}
                                    className={endereco.cidade ? styles.hasValue : ""}
                                />
                                <label className={styles.floatingLabel}>Cidade</label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type="text"
                                    name="estado"
                                    value={endereco.estado}
                                    onChange={handleChange}
                                    className={endereco.estado ? styles.hasValue : ""}
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
