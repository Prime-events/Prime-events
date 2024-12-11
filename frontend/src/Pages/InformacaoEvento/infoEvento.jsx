import { useEffect, useState } from 'react';
import styles from './infoEvento.module.css';
import styleModal from './infoEventoModalEstimativa.module.css';
import SideBar from '../../components/sideBar/sideBar.jsx';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx';
import ImgCerimonia from '../../assets/img/imgCerimonia.png';
import ImgMapa from '../../assets/img/imgMapa.png';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { TiLocation } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import OutroModal from '../../components/modal/Modal.jsx';
import { createCategoria, getAllCategorias, createGasto, getAllEstimativaGastos, updateGasto, deletarGasto } from './apiEstimativa.js';
import { getUser } from '../../components/header/segundoHeader/api.js';
import { listarEvento } from '../Eventos/api.js';
import { createTarefa } from './apiTimeline.js';
import { buscarTarefas } from './apiTimeline.js';
import ListaConvidados from '../../components/listaConvidados/listaConvidados.jsx';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Button, Form, Row, Col, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

import { useTimelineProgresso } from "../../components/progressoTimeline/useTimelineProgresso.jsx";


function InformacaoEvento() {
    const [isConvidadoOpen, setIsConvidadoOpen] = useState(false);
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
    const [listaTarefas, setListaTarefas] = useState([]);
    const { tarefaAtual } = useTimelineProgresso(listaTarefas);

    const [evento, setEvento] = useState({});
    const [isEditMode, setIsEditMode] = useState(false); // Estado para controle de edição
    const [idItem, setIdItem] = useState(null); // Estado para o gasto sendo editado
    const [timelineModal, setTimelineModal] = useState(false);
    const [tarefa, setTarefa] = useState({
        id_evento: "",
        horario: "",
        descricao: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // pegando horário atual
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0"); // Adiciona zero à frente se necessário
    const minutes = now.getMinutes().toString().padStart(2, "0"); // Adiciona zero à frente se necessário
    const currentTime = `${hours}:${minutes}`;

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
        setIsSubmitted(false);
    }, [isSubmitted]);



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

                const data_evento = await listarEvento(id_evento);
                console.log('data evento:', data_evento);
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

    const toggleConvidado = () => {
        setIsConvidadoOpen(prevState => !prevState);
    };

    const handleOpenEstimativaModal = () => {
        setEstimativaModal(true);
    };
    const handleCloseEstimativaModal = () => {
        setEstimativaModal(false);
    };
    const handleOpenCriarCategoriaModal = () => {
        setCriarCategoriaModal(true);
        setEstimativaModal(false);
    }
    const handleCloseCriarCategoriaModal = () => {
        setCriarCategoriaModal(false);
        setEstimativaModal(true);
        setnomeCategoria('');
    }
    const handleOpenCriarGastoModal = async () => {
        setCriarGastoModal(true);
        setEstimativaModal(false);
        // Chame fetchCategorias aqui
    };
    const handleCloseCriarGastoModal = () => {
        setCriarGastoModal(false);
        setEstimativaModal(true);
        setIsEditMode(false);
        setNomeGasto(``);
        setQuantidade(``);
        setCategoriaSelecionada(``);
        setValor(``);
    }

    const handleOpenEditarGastoModal = (item) => {
        setCriarGastoModal(true);
        setIsEditMode(true); // Modo de edição
        console.log(item);
        setIdItem(item.id_estimativa); // Define o gasto atual sendo editado
        setNomeGasto(item.nome_item)
        setCategoriaSelecionada(item.categoria_nome);
        setQuantidade(item.quantidade_item);
        setValor(item.valor_item);
        setEstimativaModal(false);
    };

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
            setIsSubmitted(true);
            // Atualizar categorias se necessário
            setCriarCategoriaModal(false)
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const handleCriarGasto = async (event) => {
        event.preventDefault();
        const gastoAtualizado = {
            nome_item: nomeGasto, // Corrigido o nome da chave para coincidir com o back-end
            valor_item: valor, // Corrigido o nome da chave para coincidir com o back-end
            quantidade_item: quantidade, // Corrigido o nome da chave para coincidir com o back-end
            id_evento: localStorage.getItem('idEvento'),
            id_categoria: categoriaSelecionada // Corrigido o nome da chave para coincidir com o back-end
        };
        console.log("As info do gasto são: " + JSON.stringify(gastoAtualizado, null, 2));

        handleCloseCriarGastoModal(); // Fechar o modal após criação/edição do gasto

        setGastosAtualizados(prevState => !prevState); // Atualizar a lista de gastos
        try {
            if (isEditMode && gastoAtualizado) {
                // Atualizar o gasto existente
                const response = await updateGasto(idItem, gastoAtualizado);
                console.log("Resposta do servidor:", response);
            } else {
                // Criar novo gasto
                const response = await createGasto(gastoAtualizado);
                console.log("Resposta do servidor:", response);
            }

        } catch (error) {
            console.error('Erro ao criar/atualizar gasto:', error.message);
        }
    };

    const handleDeletarGasto = async (id) => {
        await deletarGasto(id);
        setGastosAtualizados(prevState => !prevState); // Atualizar a lista de gastos
    }

    const handleTimelineModalOpen = () => {
        setTimelineModal(true);
    };

    const handleTimelineModalClose = () => {
        setTimelineModal(false);
    };


    // Obtém a tarefa atual

    // Função para determinar o status da tarefa (passada, atual ou pendente)
    function obterStatusTarefa(index) {
        if (index < tarefaAtual) return 'passada';
        if (index === tarefaAtual) return 'atual';
        return 'pendente';
    }

    // Função para calcular o estilo da tarefa com base no seu status
    function obterEstiloTarefa(status) {
        switch (status) {
            case 'passada':
                return { backgroundColor: '#FCA311' };
            case 'atual':
                return { backgroundColor: 'green', color: 'white' };
            case 'pendente':
                return { backgroundColor: 'gray' };
            default:
                return {};
        }
    }



    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const id_evento = localStorage.getItem('idEvento');

                if (!id_evento) {
                    console.error('id_evento não encontrado no localStorage.');
                    return;
                }

    
                const data_tarefas = await buscarTarefas(id_evento);
                console.log('data:', data_tarefas);
    

                // Atualiza o estado listaTarefas com as tarefas retornadas
                setListaTarefas(data_tarefas);
            } catch (error) {
                console.error('Erro ao buscar tarefas:', error);
            }
        };
    
        fetchTarefas();
        setIsSubmitted(false);
    }, [isSubmitted]);
    

    const handleCriarTarefa = async (event) => {
        event.preventDefault();

        const id_evento = localStorage.getItem('idEvento'); // Recupera o ID do evento

        if (!id_evento) {
            console.error('id_evento não encontrado no localStorage.');
            return;
        }

        // Atualiza o estado da tarefa com o id_evento antes de criar
        const tarefaAtualizada = {
            ...tarefa,
            id_evento,
        };
    
        console.log("As info da tarefa são: " + JSON.stringify(tarefaAtualizada, null, 2));
    
        try {
            await createTarefa(tarefaAtualizada);
    
            // Reseta apenas os campos necessários
            setTarefa((prevData) => ({
                ...prevData,
                horario: "",
                descricao: ""
            }));

            // Atualiza o estado de envio para disparar o fetch novamente
            setIsSubmitted(true);
        } catch (error) {
            console.error('Erro ao criar tarefa:', error.message);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    

        // Atualiza dinamicamente o campo correspondente no estado
        setTarefa((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                            <img className={styles.imagemEvento} src={evento.imagem} alt="Cerimônia" />
                        </div>
                        <div className={styles.containerImagemMapa}>
                            <img className={styles.imagemMapa} src={ImgMapa} alt="Mapa do local" />
                        </div>
                    </div>

                    <div className={styles.secaoDireita}>
                        <div className={styles.itensTopoSecao}>
                            <span className={styles.nomeEvento}>{evento.nomeEvento}</span>
                            <div className={styles.editarInformacoes}>
                                <button className={styles.btnEditar} onClick={() => navigate(`/criarEvento?id=${evento.id_evento}`)}><FaRegEdit style={{ fontSize: '1.4rem' }} />Editar informações</button>
                            </div>
                        </div>
                        <div className={styles.infoEvento}>
                            <div className={styles.infoItem}>
                                <FaCalendarAlt className={styles.icon} />
                                <span>Data:</span>
                                <span>{evento.dataHoraInicial ? new Date(evento.dataHoraInicial).toLocaleDateString('pt-BR') : ''}</span>
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
                            <button className={styles.botao} onClick={toggleConvidado} >Lista de convidados</button>
                            <button className={styles.botao} onClick={handleOpenEstimativaModal}>Estimativa de gastos</button>
                            <button className={styles.botao} onClick={handleTimelineModalOpen} >Cronograma</button>
                        </div>
                    </div>
                </div>
                <ListaConvidados open={isConvidadoOpen} setOpen={setIsConvidadoOpen} />
            </div>

            <Modal
                isOpen={timelineModal} // Controle do estado do modal
                toggle={handleTimelineModalClose}
                className={styles.timeLineModal}
                centered
            >
                <div className={styles.modalContainer}>
                    <ModalHeader toggle={handleTimelineModalClose} className={styles.headerConfiguracoes}>
                        Timeline do evento
                    </ModalHeader>
                    <ModalBody>
                        <div className={styles.secoes}>
                            <div className={styles.secaoEsquerda}>
                                <span className={styles.tituloCronograma}>Cronograma do Evento</span>
                                <div className={styles.itensSecaoEsq}>
                                    <div className={styles.itensHorario}>
                                        <span>Horário</span>
                                        <input
                                            type="time"
                                            name="horario"
                                            required
                                            value={tarefa.horario}
                                            min={currentTime}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <Form className={styles.formularioTarefa}>
                                        <Row>
                                            <FormGroup className={styles.formTarefa}>
                                                <Label for="exampleTarefa">Descrição da tarefa *</Label>
                                                <Input
                                                    className={styles.inputTarefa}
                                                    id="exampleTarefa"
                                                    name="descricao"
                                                    type="text"
                                                    required
                                                    maxLength={25}
                                                    value={tarefa.descricao}
                                                    onChange={handleInputChange}
                                                />
                                            </FormGroup>
                                        </Row>
                                        <button className={styles.btnAdicionarTarefa} onClick={handleCriarTarefa}>Adicionar</button>
                                    </Form>
                                </div>
                            </div>
                            <div className={styles.secaoDireita}>
                                <Timeline position="horizontal">
                                
                                    {listaTarefas.map((tarefa, index) => {
                                        const statusTarefa = obterStatusTarefa(index); // Determina o status da tarefa
                                        const estiloTarefa = obterEstiloTarefa(statusTarefa); // Obtém o estilo da tarefa

                                        return (
                                            <TimelineItem key={index}>
                                                <TimelineOppositeContent color="text.secondary">
                                                    {tarefa.horario}
                                                </TimelineOppositeContent>
                                                <TimelineSeparator>
                                                    <TimelineDot style={estiloTarefa} /> {/* Aplica o estilo ao TimelineDot */}
                                                    {index !== listaTarefas.length - 1 && <TimelineConnector />}
                                                </TimelineSeparator>
                                                <TimelineContent>{tarefa.descricao}</TimelineContent>
                                            </TimelineItem>
                                        );
                                    })}

                                </Timeline>
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>

            <OutroModal open={estimativaModal} onClose={handleCloseEstimativaModal}>
                <div className={styleModal.modalContainer}>
                    <div className={styleModal.headerConfiguracoes}>
                        <h1>Estimativa de Gasto</h1>
                    </div>
                    <div className={styleModal.modalBodyEstimativa}>
                        <div className={styleModal.categoriaModalButtons}>
                            <button onClick={handleOpenCriarGastoModal}>Criar Gasto</button>
                            <button onClick={handleOpenCriarCategoriaModal}>Criar Categoria</button>
                        </div>
                        <div className={styleModal.containerTabela}>
                            <table className={styleModal.listaEstimativa}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Categoria</th>
                                        <th>Quantidade</th>
                                        <th>Valor</th>
                                        <th>Valor Total</th>
                                        <th>Ações</th> {/* Nova coluna para os botões de ação */}
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
                                            <td>
                                                <button onClick={() => handleOpenEditarGastoModal(item)}><HiOutlinePencilAlt /></button> {/* Botão de editar */}
                                                <button onClick={() => handleDeletarGasto(item.id_estimativa)}><FaTrash /></button> {/* Botão de excluir */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={styleModal.valorTotal}>
                            <h4>O valor total que irá gastar é de R${totalSoma}</h4>
                        </div>
                    </div>
                </div>
            </OutroModal>



            <OutroModal open={CriarCategoriaModal} onClose={handleCloseCriarCategoriaModal}>
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
            </OutroModal>

            <OutroModal open={CriarGastoModal} onClose={handleCloseCriarGastoModal}>
                <div className={styleModal.modalContainer}>
                    <div className={styleModal.headerConfiguracoes}>
                        <h1>{isEditMode ? 'Editar Gasto' : 'Criar Gasto'}</h1>
                    </div>
                    <div className={styleModal.modalBodyEstimativa}>
                        <Form className='CategoriaForm' onSubmit={handleCriarGasto}>
                            <FormGroup>
                                <Label for="NomeGasto">Nome do Gasto</Label>
                                <Input
                                    type="text"
                                    id="NomeGasto"
                                    value={nomeGasto}
                                    className={styleModal.inputLarger}
                                    onChange={(e) => setNomeGasto(e.target.value)}
                                    required
                                    disabled={isEditMode} // Bloquear campo no modo de edição
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
                                    disabled={isEditMode} // Bloquear campo no modo de edição
                                >
                                    <option value="" disabled>Selecione uma categoria</option>
                                    {isEditMode ? <option value={idItem}>{categoriaSelecionada}</option> : categoria.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Quantidade">Quantidade</Label>
                                <Input
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
                                <Input
                                    type="number"
                                    id="Valor"
                                    value={valor}
                                    className={styleModal.inputLarger}
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
                                    {isEditMode ? 'Atualizar' : 'Criar'}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </OutroModal>

        </>
    );
}

export default InformacaoEvento;