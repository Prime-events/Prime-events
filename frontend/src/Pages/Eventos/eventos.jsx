import { Link, useNavigate } from "react-router-dom";
import SegundoHeader from "../../components/header/segundoHeader/segundoHeader";
import SideBar from "../../components/sideBar/sideBar";
import styles from "./eventos.module.css";
import { useEffect, useState } from "react";
import { listarEvento, listarEventosUsuario } from "./api";
import { getUser } from "../../components/header/segundoHeader/api";
import { listarConvidadosEvento } from "../../components/listaConvidados/api";
import { atualizarEvento, excluirEvento } from "../CriacaoEvento/api";
import imgLogo from '../../assets/img/logo 1.png'
import { buscarTarefas } from "../InformacaoEvento/apiTimeline";
import { listarEventoPorNome } from "./api";
import { buscarEventosPorPeriodo } from "./api";

function Eventos() {
    console.log("Componente Eventos está sendo renderizado");
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('pendentes');
    const [isMenuActive, setIsMenuActive] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [buscaEventoNome, setBuscaEventoNome] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const [convidadosPorEvento, setConvidadosPorEvento] = useState({});

    // Keep the existing filtering logic
    const eventosFiltrados = Array.isArray(eventos) && eventos.length > 0 ? 
        isActive === "todos" ? eventos : eventos.filter((evento) => evento.status === "Pendente") :
        [];

    const toggleActive = (state) => {
        setIsActive(state);
    }
    const toggleMenu = (id) => {
        setIsMenuActive((prevMenu) => (prevMenu === id ? null : id));
    }

    useEffect(() => {
        if (Array.isArray(eventos) && eventos.length > 0) {
            eventos.forEach((evento) => {
                fetchNumeroConvidados(evento.id_evento);
            });
        }
    }, [eventos]);
    useEffect(() => {
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        console.log('Iniciando fetchEventos');
        try {
            const email = localStorage.getItem('email');
            console.log('Email:', email);
            const data_usuario = await getUser(email);
            console.log('Dados usuário:', data_usuario);
            const { id_usuario } = data_usuario;
            console.log('ID usuário:', id_usuario);
            console.log('Chamada listarEventosUsuario com id_usuario:', id_usuario);
            let data_eventos = await listarEventosUsuario(id_usuario);
            console.log('Eventos obtidos:', data_eventos);
            data_eventos.forEach(async (evento) => {
                if (evento.imagem == "") {
                    evento.imagem = imgLogo;
                    await atualizarEvento(evento)
                }
            })
            console.log('data:', data_eventos);
            setEventos(data_eventos);
        } catch (error) {
            console.error('Erro:', error);
        }
    };
    const fetchNumeroConvidados = async (id_evento) => {
        try {
            const convidados = await listarConvidadosEvento(id_evento);
            setConvidadosPorEvento((prev) => ({
                ...prev,
                [id_evento]: convidados.length,
            }));
        } catch (error) {
            console.error('Erro ao buscar convidados:', error);
        }
    }
    const handleRedirect = (id_evento) => {
        localStorage.setItem('idEvento', id_evento);
        navigate('/informacaoEvento');
    }
    const handleExcluirEvento = async (id_evento) => {
        console.log('excluido');
        await excluirEvento(id_evento);
        fetchEventos();
    }
    const handleCancelarEvento = async (id_evento) => {
        const data_evento = await listarEvento(id_evento);
        data_evento.status = "Cancelado";
        await atualizarEvento(data_evento);
        fetchEventos();
    }

    const handleConcluirEvento = async (id_evento) => {
        const data_evento = await listarEvento(id_evento);
        data_evento.status = "Concluido";
        await atualizarEvento(data_evento);
        fetchEventos();
    }


    const handleBuscarEventoNome = async () => {
        try {
            if (buscaEventoNome == "") {
                fetchEventos();
            }
            const response = await listarEventoPorNome(buscaEventoNome);
            setEventos(response);
        } catch (error) {
            console.error('Erro ao buscar evento:', error);
        }
    }

    
    
    const handleFiltrar = async () => {
        try {
          // Converte as datas para o formato necessário
          const dataInicialFormatada = new Date(dataInicial).toISOString();
          const dataFinalFormatada = new Date(dataFinal).toISOString();
    
          const resultado = await buscarEventosPorPeriodo(dataInicialFormatada, dataFinalFormatada);
          setEventos(resultado);
          console.log(resultado);
        } catch (error) {
          console.error('Erro ao buscar eventos:', error);
        }
      };

    return (
        <>
            <SegundoHeader titulo="Eventos" />
            <div className={styles.container}>
                <SideBar />
                <div className={styles.containerEventos}>
                    <div className={styles.cimaEvento}>
                        <span className={`${isActive === 'pendentes' ? styles.active : ''}`} onClick={() => toggleActive('pendentes')}>Eventos Pendentes</span>
                        <span className={`${isActive === 'todos' ? styles.active : ''}`} onClick={() => toggleActive('todos')}>Todos</span>
                    </div>
                    <div className={styles.meioEvento}>
                        <div className={styles.inputContainer}>
                            <input type="search" name="search"
                                id={styles.search}
                                placeholder="Buscar Eventos"
                                value={buscaEventoNome}
                                onChange={e => setBuscaEventoNome(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleBuscarEventoNome();
                                    }
                                }} />
                            <svg className={styles.lupa} width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M15.6517 2.25C22.8117 2.25 28.6357 7.164 28.6357 13.2053C28.6357 16.0555 27.3393 18.6551 25.2179 20.6061L29.3923 24.1208C29.7829 24.4504 29.7843 24.9837 29.3936 25.3133C29.1989 25.4798 28.9416 25.5619 28.6856 25.5619C28.4309 25.5619 28.1749 25.4798 27.9789 25.3155L23.7542 21.7609C21.5318 23.2626 18.714 24.1616 15.6517 24.1616C8.49172 24.1616 2.66638 19.2465 2.66638 13.2053C2.66638 7.164 8.49172 2.25 15.6517 2.25ZM15.6517 3.9375C9.59438 3.9375 4.66638 8.09438 4.66638 13.2053C4.66638 18.3161 9.59438 22.4741 15.6517 22.4741C21.7077 22.4741 26.6357 18.3161 26.6357 13.2053C26.6357 8.09438 21.7077 3.9375 15.6517 3.9375Z" fill="#342626" />
                            </svg>
                        </div>
                        <div className={styles.dataInicial}>
                            <label
                                htmlFor="dataInicial"
                                style={{
                                    width: '9rem',
                                    textAlign: 'center',
                                    fontSize: '1.2rem',
                                }}
                            >
                                Data inicial
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    type="date"
                                    name="dataInicial"
                                    id="dataInicial"
                                    value={dataInicial}
                                    required
                                    onChange={(e) => setDataInicial(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className={styles.dataFinal}>
                            <label
                                htmlFor="dataFinal"
                                style={{
                                    width: '9rem',
                                    textAlign: 'center',
                                    fontSize: '1.2rem',
                                }}
                            >
                                Data final
                            </label>
                            <div className={styles.inputContainer}>
                                <input
                                    type="date"
                                    name="dataFinal"
                                    id="dataFinal"
                                    value={dataFinal}
                                    required
                                    disabled={!dataInicial} // Desabilita se `dataInicial` for vazia
                                    min={dataInicial} // Garante que não permite uma data anterior
                                    onChange={(e) => setDataFinal(e.target.value)} 
                                />
                            </div>
                        </div>
                        
                        <div className={styles.btnCriarStyle}>
                            <Link to={"/criarEvento"}>
                                <button>Criar Evento</button>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.baixoEvento}>
                        <table className={styles.tabelaEventoStyle}>
                            <thead>
                                <tr>
                                    <th>Eventos</th>
                                    <th>Convidados</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventosFiltrados.map((evento) => (
                                    <tr key={evento.id_evento}>
                                        <td>
                                            <div className={styles.informacoesEvento}>
                                                <div className={styles.data}>
                                                    <label className={styles.mesEvento}>{mesesAbreviados[new Date(evento.dataHoraInicial).getMonth()]}</label>
                                                    <label className={styles.diaEvento}>{new Date(evento.dataHoraInicial).getDate()}</label>
                                                </div>
                                                <div className={styles.imagem}><img src={evento.imagem} /></div>
                                                <div className={styles.endereco}>
                                                    <label className={styles.nomeEvento} onClick={() => handleRedirect(evento.id_evento)}>{evento.nomeEvento}</label>
                                                    <label className={styles.infoEvento}>{evento.nomeLocal}</label>
                                                    <label className={styles.infoEvento}>{`${evento.rua} ${evento.numero} ${evento.complemento} ${evento.bairro} ${evento.cidade}`}</label>
                                                    {evento.dataHoraInicial && evento.dataHoraFinal ? (
                                                        <label className={styles.infoEvento}>
                                                            {new Date(evento.dataHoraInicial).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - 
                                                            {new Date(evento.dataHoraFinal).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                        </label>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.numeroConvidados}>{convidadosPorEvento[evento.id_evento]}</div>
                                        </td>
                                        <td>
                                            <div className={styles.status}>{evento.status}</div>
                                        </td>
                                        <div className={styles.tresBotoesStyle} onClick={() => toggleMenu(evento.id_evento)}>
                                            <figure></figure>
                                            <figure className={`${styles.middle} ${isMenuActive === evento.id_evento ? styles.menuActive : ''}`}></figure>
                                            <p className={`${styles.fecharMenu} ${isMenuActive === evento.id_evento ? styles.menuActive : ''}`}>X</p>
                                            <figure></figure>
                                            <ul className={`${styles.dropdown} ${isMenuActive === evento.id_evento ? styles.menuActive : ''}`}>
                                                <li><a onClick={() => handleRedirect(evento.id_evento)}>Informações do Evento</a></li>
                                                <li><a onClick={() => handleConcluirEvento(evento.id_evento)}>Concluir evento</a></li>
                                                <li><a onClick={() => handleCancelarEvento(evento.id_evento)}>Cancelar evento</a></li>
                                                <li><a onClick={() => handleExcluirEvento(evento.id_evento)}>Excluir evento</a></li>
                                            </ul>
                                        </div> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Eventos;
