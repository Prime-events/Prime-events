import React, { useEffect, useState } from 'react';
import styles from './infoEvento.module.css';
import styleModal from './infoEventoModalEstimativa.module.css';
import SideBar from '../../components/sideBar/SideBar.jsx';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx';
import ImgCerimonia from '../../assets/img/imgCerimonia.png';
import ImgMapa from '../../assets/img/imgMapa.png';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { TiLocation } from "react-icons/ti";
import { FaRegEdit, FaLink } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import ModalO from '../../components/modal/Modal.jsx';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { createCategoria, getAllCategorias, createGasto, getAllEstimativaGastos} from './apiEstimativa.js';
import { getUser } from '../../components/header/segundoHeader/api.js';
import { listarEvento } from '../Eventos/api.js';

function InformacaoEvento() {
    const [isConvidadoOpen, setIsConvidadoOpen] = useState(false);
    const [convidadoInfo, setConvidadoInfo] = useState({
        id_evento: "",
        nome: "",
        telefone: "",
    })
    const [convidados, setConvidados] = useState([]);

    const navigate = useNavigate();
    const [CriarCategoriaModal, setCriarCategoriaModal] = useState(false);
    const [CriarGastoModal, setCriarGastoModal] = useState(false);
    const [estimativaModal, setEstimativaModal] = useState(false);
    const [gastosAtualizados, setGastosAtualizados] = useState(false);
    const [nomeCategoria, setnomeCategoria] = useState(' ');
    const [categoria, setCategoria] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [nomeGasto, setNomeGasto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [totalSoma, setTotalSoma] = useState(0);
    const [listaItens, setListaItens] = useState([]);
    const [evento, setEvento] = useState({});

    useEffect(() => {
        const fetchConvidados = async () => {
            try {
                const id_evento = localStorage.getItem('idEvento');
                setConvidadoInfo((prevData) => ({...prevData, id_evento: id_evento}));
                const data_convidados = await listarConvidadosEvento(id_evento);
                console.log('data:', data_convidados);
                setConvidados(data_convidados);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchConvidados();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categorias = await getAllCategorias();
                setCategoria(categorias);
            } catch (error) {
                console.error('Erro ao obter categorias:', error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchGastos = async () => {
            try {
                const id_evento = localStorage.getItem('idEvento');
                console.log('ID do evento:', id_evento);
                const gastos = await getAllEstimativaGastos(id_evento);
                console.log('Gastos recebidos:', gastos);
                setListaItens(gastos);
                let soma = 0;
                gastos.forEach(item => {
                    soma += item.valor_item * item.quantidade_item;
                });
                setTotalSoma(soma);
            } catch (error) {
                console.error('Erro ao obter gastos:', error);
            }
        };
    
        fetchGastos();
    }, [gastosAtualizados]);
    
    useEffect(() => {
        const fetchInformacoesEvento = async () => {
            try {
                const id_evento = localStorage.getItem('idEvento');
                setConvidadoInfo((prevData) => ({...prevData, id_evento: id_evento}));
                const data_evento = await listarEvento(id_evento);
                console.log('data:', data_evento);
                setEvento(data_evento);
            } catch (error) {
                console.error('Erro:', error);
            }
        };
    
        fetchInformacoesEvento();
    }, []);
    
    
    const handleCategoriaChange = (e) => { 
        setCategoriaSelecionada(e.target.value); 
    };
    

    const handleRedirect = () => {
        localStorage.removeItem('idEvento');
        navigate('/eventos');
    };

    const handleChangeConvidado = (e) => {
        const { name, value } = e.target;
        setConvidadoInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmitConvidado = async (e) => {
        if (convidadoInfo.nome == "") return;
        e.preventDefault();
        console.log(convidadoInfo);
        await createConvidado(convidadoInfo);
    }
    
    
    const handleOpenModal = () =>{

    }
    const handleOpenEstimativaModal = () => {
        setEstimativaModal(true);
    };
    const handleCloseEstimativaModal = () => {
        setEstimativaModal(false);
    };
    const handleOpenCriarCategoriaModal = () =>{
        setCriarCategoriaModal(true);
        setEstimativaModal(false);
    }
    const handleCloseCriarCategoriaModal = () =>{
        setCriarCategoriaModal(false);
        setEstimativaModal(true);
        setnomeCategoria('');
    }
    const handleOpenCriarGastoModal = async () => {
        setCriarGastoModal(true);
        setEstimativaModal(false);
        // Chame fetchCategorias aqui
    };
    const handleCloseCriarGastoModal = () =>{
        setCriarGastoModal(false);
        setEstimativaModal(true);
        setNomeGasto(``);
        setQuantidade(``);
        setCategoriaSelecionada(``);
        setValor(``);
    }
    const handleCriarCategoria = async (e) => {
        e.preventDefault();
    
        try {
            const email = localStorage.getItem('email');
            console.log('Email do usuário:', email);
            
            const data_usuario = await getUser(email);
            console.log('Dados do usuário obtidos:', data_usuario);
            
            const { id_usuario } = data_usuario;
            if (!id_usuario) {
                throw new Error('ID do usuário não encontrado');
            }
    
            const categoria = {
                nome: nomeCategoria, // Certifique-se de que o campo corresponde ao esperado no servidor
                id_usuario
            };
    
            await createCategoria(categoria);
    
            
            handleCloseCriarCategoriaModal();
            // Atualizar categorias se necessário
            setCriarCategoriaModal(false)
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const handleCriarGasto = async (event) => {
        event.preventDefault();
    
        // Certifique-se de que as variáveis estão sendo preenchidas corretamente
        const novoGasto = {
            nome: nomeGasto,
            categoriaId: categoriaSelecionada, // Use o valor do estado da categoria selecionada
            quantidade: quantidade,
            valor: valor,
            id_evento: localStorage.getItem('idEvento') // Obter o ID do evento do localStorage
        };
        handleCloseCriarGastoModal();
        setGastosAtualizados(prevState => !prevState); // Atualiza o estado para re-executar o useEffect
        try {
            const resposta = await createGasto(novoGasto);
            console.log("Resposta do servidor:", resposta);
            
        } catch (error) {
            console.error('Erro ao criar gasto:', error);
        }
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

                    <div className={styles.secaoDireita}>
                        <div className={styles.itensTopoSecao}>
                            <span className={styles.nomeEvento}>{evento.nomeEvento}</span>
                            <div className={styles.editarInformacoes}>
                                <button className={styles.btnEditar}><FaRegEdit style={{ fontSize: '1.4rem' }} />Editar informações</button>
                            </div>
                        </div>
                        <div className={styles.infoEvento}>
                            <div className={styles.infoItem}>
                                <FaCalendarAlt className={styles.icon} />
                                <span>Data:</span>
                                <span>{evento.dataHoraInicial ? new Date(evento.dataHoraInicial).toLocaleDateString('pt-BR'): ''}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Início:</span>
                                <span>{evento.dataHoraInicial ? new Date(evento.dataHoraInicial).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                            </div>
                            <div className={styles.infoItemLocalizacao}>
                                <TiLocation className={styles.icon} style={{ fontSize: '2rem', marginLeft: '-5px' }} />
                                <span>Localização: </span>
                                <span>{`${evento.rua} ${evento.numero} ${evento.complemento} ${evento.bairro} ${evento.cidade}`}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Término:</span>
                                <span>{evento.dataHoraInicial ? new Date(evento.dataHoraFinal).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                            </div>
                        </div>
                        <div className={styles.descricao}>
                            <div className={styles.legendaDescricao}><strong>Descrição:</strong></div>
                            <p>{evento.descricaoEvento}</p>
                        </div>
                        <div className={styles.botoes}>
                            <button className={styles.botao} onClick={() => setIsConvidadoOpen(true)} >Lista de convidados</button>
                            <button className={styles.botao} onClick={handleOpenEstimativaModal}>Estimativa de gastos</button>
                            <button className={styles.botao}>Cronograma</button>
                        </div>
                    </div>
                </div>

                <ModalO open={isConvidadoOpen} onClose={() => setIsConvidadoOpen(false)}>
                    
                    <div className={styles.containerModalConvidado}>
                        <div className={styles.tituloModal}>
                            Lista de convidados
                        </div>
                        <div className={styles.inputContainerRow}>
                            <div className={styles.inputContainer}>    
                                <input
                                    type='text'
                                    name='nome'
                                    value={convidadoInfo.nome}
                                    onChange={handleChangeConvidado}
                                    maxLength={40}
                                    className={convidadoInfo.nome ? styles.hasValue : ""}
                                    ></input>
                                <label className={styles.floatingLabel}>Nome: </label>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    type='text'
                                    name='telefone'
                                    value={convidadoInfo.telefone}
                                    onChange={handleChangeConvidado}
                                    maxLength={11}
                                    className={convidadoInfo.telefone ? styles.hasValue : ""}
                                    ></input>
                                <label className={styles.floatingLabel}>Telefone: </label>
                            </div>
                        </div>
                        <button onClick={handleSubmitConvidado}>Adicionar Convidado</button> <button>Gerar Link <FaLink/></button>
                        <div className={styles.containerTabela}>
                            <table className={styles.containerConvidados}>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>Presença</th>
                                {/*map lista*/}
                                {convidados.map((convidado) => (
                                <tr key={convidado.id_convidado}>
                                    <td>{convidado.nome}</td>
                                    <td>{convidado.telefone}</td>
                                    <td>{convidado.presenca}</td>
                                </tr>
                                ))}
                            </table>
                        </div>
                </div>
                
                </ModalO>
            </div>
            
            <ModalO open={estimativaModal} onClose={handleCloseEstimativaModal}>
                <div className={styleModal.modalContainer}>
                    <div className={styleModal.tituloModal}>
                        <h1>Estimativa de Gasto</h1>
                    </div>
                    <div className={styleModal.modalBodyEstimativa}>
                        <button onClick={handleOpenCriarGastoModal}>Criar Gasto</button>
                        <button onClick={handleOpenCriarCategoriaModal}>Criar Categoria</button>
                        <div className={styleModal.containerTabela}>
                            <table className={styleModal.listaEstimativa}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Categoria</th>
                                        <th>Quantidade</th>
                                        <th>Valor</th>
                                        <th>Valor Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaItens.map(item => (
                                        <tr key={`${item.nome_item}-${item.id_evento}`}>
                                            <td>{item.nome_item}</td>
                                            <td>{item.categoria_nome}</td>
                                            <td>{item.quantidade_item}</td>
                                            <td>R${item.valor_item}</td>
                                            <td>R${item.valor_item * item.quantidade_item}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h4>O valor total que irá gastar é de R${totalSoma}</h4>
                    </div>
                </div>
            </ModalO>


            <ModalO open={CriarCategoriaModal} onClose={handleCloseCriarCategoriaModal}>
                <div className={styleModal.modalContainer}>
                    <div className={styleModal.headerConfiguracoes}>
                        <h1>Criar Categoria</h1>
                    </div>
                    <div className={styleModal.modalBodyEstimativa}>
                        <Form className='CategoriaForm' onSubmit={handleCriarCategoria}>
                            <FormGroup>
                                <Label for="NomeCategoria">Nome da Categoria</Label>
                                <Input
                                    type="text"
                                    id="NomeCategoria"
                                    value={nomeCategoria}
                                    onChange={(e) => setnomeCategoria(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <div className={styleModal.categoriaModalButtons}>
                                <Button
                                    type="button"
                                    onClick={handleCloseCriarCategoriaModal}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                >
                                    Criar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </ModalO>

            <ModalO open={CriarGastoModal} onClose={handleCloseCriarGastoModal}>
                <div className={styleModal.modalContainer}>
                    <div className={styleModal.headerConfiguracoes}>
                        <h1>Criar Gasto</h1>
                    </div>
                    <div className={styleModal.modalBodyEstimativa}>
                        <Form className='CategoriaForm' onSubmit={handleCriarGasto}>
                            <FormGroup>
                                <Label for="NomeGasto">Nome do Gasto</Label>
                                <input
                                    type="text"
                                    id="NomeGasto"
                                    value={nomeGasto}
                                    className={styleModal.inputLarger}
                                    onChange={(e) => setNomeGasto(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Categoria">Categoria</Label>
                                <Input
                                    type="select"
                                    id="Categoria"
                                    value={categoriaSelecionada}
                                    className={styleModal.inputLarger}
                                    onChange={handleCategoriaChange}
                                    required
                                >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    {categoria.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Quantidade">Quantidade</Label>
                                <input
                                    type="number"
                                    id="Quantidade"
                                    value={quantidade}
                                    className={styleModal.inputLarger}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Valor">Valor</Label>
                                <input
                                    type="number"
                                    id="Valor"
                                    value={valor}
                                    
                                    onChange={(e) => setValor(e.target.value)}
                                    required
                                />
                            </FormGroup>
                            <div className={styleModal.categoriaModalButtons}>
                                <Button
                                    type="button"
                                    onClick={handleCloseCriarGastoModal}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                >
                                    Criar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </ModalO>
        </>
    );
}

export default InformacaoEvento;








