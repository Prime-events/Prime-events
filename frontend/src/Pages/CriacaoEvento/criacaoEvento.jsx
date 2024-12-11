import { useEffect, useState } from 'react';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx'
import SideBar from '../../components/sideBar/sideBar.jsx';
import styles from "./criacaoEvento.module.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { createEvento } from './api.js';
import { getUser } from '../../components/header/segundoHeader/api.js';
import { ImgurUpload } from './imgurApi.js';
import { atualizarEvento } from './api.js';
import { listarEvento } from '../Eventos/api.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CriacaoEvento() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const navigate = useNavigate(); 
    const [hasImagem, setHasImagem] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [hasDate, setHasDate] = useState(false);
    const [imagemURL, setImagemURL] = useState('');
    const [data, setData] = useState({
        nomeEvento: "",
        descricaoEvento: "",
        nomeLocal: "",
        dataHoraInicial: null,
        dataHoraFinal: null,
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        imagem: "",
        id_usuario: "",
    });
    const [date, setDate] = useState({
        dataEvento: "",
        horarioInicio: "00:00",
        horarioTermino: "00:00",
    });
    const minutos = [];

    // pegando dia anterior
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    const yesterdayFormatted = yesterday.toISOString().split("T")[0]; 

    // pegando horário atual

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0"); // Adiciona zero à frente se necessário
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Adiciona zero à frente se necessário
    const currentTime = `${hours}:${minutes}`;


    for (let i = 0; i < 60; i += 5) {
        minutos.push(String(i).padStart(2, '0'));
    }
    const handleImagemUpload = async (imagem) => {
        const formData = new FormData();
        formData.append('image', imagem);
        formData.append('type', 'file');
        formData.append('title', 'Simple upload');
        formData.append('description', 'This is a simple image upload in Imgur');
        
        const imagemLink = await ImgurUpload(formData);
        console.log('ImagemLink: ', imagemLink);
        setData((prevData) => ({ ...prevData, imagem: imagemLink}));
    }

    const handleDate = (e) => {
        const { name, value } = e.target;
        const newDate = { ...date, [name]: value };
            
        if (newDate.dataEvento && newDate.horarioInicio) {
            const [horaInicio, minutoInicio] = newDate.horarioInicio.split(":");
            const dataHoraInicial = new Date(newDate.dataEvento + "T03:00:00Z");
            dataHoraInicial.setHours(horaInicio, minutoInicio);
            setData((prevData) => ({ ...prevData, dataHoraInicial }));
            setHasDate(true);
            console.log(newDate.dataEvento)
            console.log(dataHoraInicial);
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
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemURL(URL.createObjectURL(file));
            console.log(URL.createObjectURL(file));
            handleImagemUpload(file);
            setHasImagem(true);
        }
    };

    useEffect(() => {
        const fetchEndereco = async () => {
            if(!localStorage.getItem('token')){
                console.error('É preciso fazer login para ter acesso');
                navigate('/formulario');
            }
            const response = await axios.get(`https://viacep.com.br/ws/${data.cep}/json/`);
            if (response.data.erro) {
                setIsValid(false);
                return;
            }
            setData((prevData) => ({...prevData, rua: response.data.logradouro}));
            setData((prevData) => ({...prevData, bairro: response.data.bairro}));
            setData((prevData) => ({...prevData, estado: response.data.estado}));
            setData((prevData) => ({...prevData, cidade: response.data.localidade}));
            setIsValid(true);
        }
        const cep = data.cep.replace(/\D/g, '');
        console.log(cep);
        const validaCep = /^[0-9]{8}$/;
        if (validaCep.test(cep)) {
            fetchEndereco();
        }
    }, [data.cep]);

    
    const handleRedirect = () => {
        navigate('/eventos');
    };

    const handleSubmitEvento = async (e) => {
        e.preventDefault();
        console.log('params', id)
        if (id) {
            navigate('/eventos');
            atualizarEvento(data);
            toast.success("Evento atualizado com sucesso!");
        }
        else {
            navigate('/eventos');
            await createEvento(data);
            toast.success("Evento criado com sucesso!");
        }
        
        console.log(data);
        
    }
    const fetchInformacoesEvento = async () => {
        try {
            const data_evento = await listarEvento(id);
            setImagemURL(data_evento.imagem);
            setHasImagem(true);
            setData(data_evento);
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('email');
                const data_usuario = await getUser(email);
                const { id_usuario } = data_usuario;
                setData((prevData) => ({...prevData, id_usuario: id_usuario}));
            } catch (error) {
                console.error('Erro:', error);
            }
        };
        if (id) {
            fetchInformacoesEvento();
        }
        fetchUserData();
    }, []);
    return (<>
     <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        <SegundoHeader titulo={` ${id ? 'Atualizar Evento' : 'Criar evento'}`}/>
        <div className={styles.container}>
            <SideBar />
            <div className={styles.containerCriacao}>
                <div className={styles.secaoEsquerda}>
                    <div className={styles.itensEsquerda}>
                        <div className={styles.voltarEventos}>
                            <button className={styles.btnVoltar} onClick={handleRedirect}><IoArrowBackCircleOutline />Voltar para eventos</button>
                        </div>
                        <div className={styles.preview}>
                            <div className={styles.itensPreview}>
                                <span className={styles.tituloPreview}>Pré-visualização</span>
                                <div className={styles.cardPreview}>
                                    <div className={styles.itensCardPreview}>
                                    <div className={`${styles.showImagem} ${hasImagem ? styles.active : ''}`} src={data.imagem}style={{backgroundImage:`url(${imagemURL})`}}></div>
                                        <label className={styles.nomePreview}>{data.nomeEvento}</label>
                                        <span className={styles.descricaoPreview}>{data.descricaoEvento}</span>
                                        <div className={styles.dateStyle}>
                                            <span className={`${styles.dataHoraPreview}`}> {`${date.dataEvento}`}</span>
                                            <span className={`${styles.dataHoraPreview} ${styles.hora} ${hasDate ? styles.show : ''}`}>{`${date.horarioInicio} - ${date.horarioTermino}`}</span>
                                        </div>
                                        <span className={`${styles.dataHoraPreview}`}>{} </span>
                                        <label className={`${styles.nomeLocalPreview}`}>{`${data.nomeLocal}`}</label>
                                        <span className={`${styles.localizacaoPreview}`}>{`${data.cep}`}</span>
                                        <span className={`${styles.localizacaoPreview}`}>{`${data.rua} ${data.numero} ${data.complemento} ${data.bairro}`}</span>
                                        <span className={`${styles.localizacaoPreview}`}>{`${data.cidade} ${data.estado}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.secaoDireita}>
                    <div className={styles.itensDireita}>
                        <form className={styles.itensDireita} onSubmit={handleSubmitEvento}>
                            <div className={`${styles.showImagem} ${hasImagem ? styles.active : ''}`} style={{backgroundImage:`url(${imagemURL})`}}>
                            </div>
                            <label htmlFor="file-upload" className={styles.btnUploadImagem}>
                                    Adicionar Imagem
                            </label>
                            <input id="file-upload" type="file" onChange={handleImageChange} accept="image/*"/>
                            <div className={styles.cardEvento}>
                                <span className={styles.tituloCardDireita}>Visão geral do Evento</span><br/>
                                <div className={styles.nomeEvento}>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            name="nomeEvento"
                                            value={data.nomeEvento}
                                            onChange={handleChange}
                                            required
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
                                        min={yesterdayFormatted}
                                        className={date.dataEvento ? styles.hasValue : ""}
                                    /><br/>
                                    <span>Início</span>
                                    <input
                                        type="time"
                                        step="300"
                                        name="horarioInicio"
                                        value={date.horarioInicio}
                                        onChange={handleDate}
                                        min={currentTime}
                                        className={date.horarioInicio ? styles.hasValue : ""}
                                    /><br/>
                                    <span>Término</span>
                                    <input
                                        type="time"
                                        step="300"
                                        name="horarioTermino"
                                        value={date.horarioTermino}
                                        onChange={handleDate}
                                        min={date.horarioInicio}
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
                                    <label className={`${styles.invalidLabel} ${isValid ? '' : styles.invalido}`}>CEP Inválido</label>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            name="cep"
                                            value={data.cep}
                                            onChange={handleChange}
                                            maxLength={9}
                                            required
                                            onInput={data.cep.length > 9 ? setData((prevData) => ({...prevData, cep: data.cep.slice(0,8)})) : null}
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
                                            maxLength={99}
                                            className={data.rua ? styles.hasValue : ""}
                                        />
                                        <label className={styles.floatingLabel}>Endereço</label>
                                    </div>
                                    <div className={styles.inputContainerRow}>
                                        <div className={styles.inputContainer}>
                                            <input
                                                type="number"
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
                                                maxLength={99}
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
                                            maxLength={50}
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
                                            maxLength={50}
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
                                            maxLength={50}
                                            className={data.estado ? styles.hasValue : ""}
                                        />
                                        <label className={styles.floatingLabel}>Estado</label>                  
                                    </div>
                                </div>
                                <div className={styles.map}></div>
                                <div className={styles.btnConcluirStyle}>
                                    <button className={styles.btnConcluir} type='submit'>Concluir</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>);

}
export default CriacaoEvento;
