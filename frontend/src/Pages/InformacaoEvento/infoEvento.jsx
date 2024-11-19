import React, { useState, useEffect } from 'react';
import styles from './infoEvento.module.css';
import styleModal from './infoEventoModalEstimativa.module.css';
import SideBar from '../../components/sideBar/SideBar.jsx';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader.jsx';
import ImgCerimonia from '../../assets/img/imgCerimonia.png';
import ImgMapa from '../../assets/img/imgMapa.png';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { TiLocation } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { createCategoria, getAllCategorias} from './apiEstimativa.js';
import { getUser } from '../../components/header/segundoHeader/api.js';

function InformacaoEvento() {
    const navigate = useNavigate();
    const [CriarCategoriaModal, setCriarCategoriaModal] = useState(false);
    const [CriarGastoModal, setCriarGastoModal] = useState(false);
    const [estimativaModal, setEstimativaModal] = useState(false);
    const [nomeCategoria, setnomeCategoria] = useState(' ');
    const [categoria, setCategoria] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [nomeGasto, setNomeGasto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [listaItens, setListaItens] = useState([
        { id: 1, nome: 'Item 1', quantidade: 2, valor: 100, categoria: 'Categoria 1' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
        { id: 2, nome: 'Item 2', quantidade: 5, valor: 200, categoria: 'Categoria 2' },
    ]);

    useEffect(() => {
        fetchCategorias();
    }, []);
    
    const fetchCategorias = async () => {
        try {
            const categorias = await getAllCategorias();
            setCategoria(categorias);
        } catch (error) {
            console.error('Erro ao obter categorias:', error);
        }
    };
    
    
    const handleCategoriaChange = (e) => { 
        setCategoriaSelecionada(e.target.value); 
    };

    const handleRedirect = () => {
        navigate('/eventos');
    };
    
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
        setnomeCategoria('');
    }
    const handleOpenCriarGastoModal = async () => {
        setCriarGastoModal(true);
        setEstimativaModal(false);
        // Chame fetchCategorias aqui
        await fetchCategorias();
    };
    const handleCloseCriarGastoModal = () =>{
        setCriarGastoModal(false);
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
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const handleCriarGasto = () =>{

    }
    

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
                            <span className={styles.nomeEvento}>Festa de casamento</span>
                            <div className={styles.editarInformacoes}>
                                <button className={styles.btnEditar} onClick={handleOpenModal}><FaRegEdit style={{ fontSize: '1.4rem' }} />Editar informações</button>
                            </div>
                        </div>
                        <div className={styles.infoEvento}>
                            <div className={styles.infoItem}>
                                <FaCalendarAlt className={styles.icon} />
                                <span>Data:</span>
                                <span>24/01/2025</span>
                            </div>
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Início:</span>
                                <span>16:00</span>
                            </div>
                            <div className={styles.infoItemLocalizacao}>
                                <TiLocation className={styles.icon} style={{ fontSize: '2rem', marginLeft: '-5px' }} />
                                <span>Localização: </span>
                                <span>Largo do Caranguejo, Itinga</span>
                            </div>
                            <div className={styles.infoItem}>
                                <FaClock className={styles.icon} />
                                <span>Hora de Término:</span>
                                <span>20:00</span>
                            </div>
                        </div>
                        <div className={styles.descricao}>
                            <div className={styles.legendaDescricao}><strong>Descrição:</strong></div>
                            <p>Durante a cerimônia, os noivos, vestidos com trajes inspirados em contos de fadas, trocam votos sob um arco floral, ao som suave de uma harpa. Após a cerimônia, os convidados desfrutam de um banquete com mesas adornadas com toalhas de cetim e pratos gourmet.</p>
                        </div>
                        <div className={styles.botoes}>
                            <button className={styles.botao}>Lista de convidados</button>
                            <button className={styles.botao} onClick={handleOpenEstimativaModal}>Estimativa de gastos</button>
                            <button className={styles.botao}>Cronograma</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal isOpen={estimativaModal} toggle={handleCloseEstimativaModal} className={styleModal.customModal} centered>
                <div className={styleModal.modalContainer}>
                    <ModalHeader toggle={handleCloseEstimativaModal} className={styleModal.headerConfiguracoes}>
                        Estimativa de Gasto
                    </ModalHeader>
                    <ModalBody className={styleModal.modalBodyEstimativa}>
                        <Button onClick={handleOpenCriarGastoModal} >Criar Gasto</Button>
                        <Button className={styleModal.btnCriarCategoria} onClick={handleOpenCriarCategoriaModal}>Criar Categoria</Button>
                        <Table bordered className={styleModal.listaEstimativa}>
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
                                    <tr key={item.id}>
                                        <td>{item.nome}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.quantidade}</td>
                                        <td>R${item.valor}</td>
                                        <td>R${item.valor * item.quantidade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ModalBody>
                </div>
            </Modal>

            <Modal isOpen={CriarCategoriaModal} toggle={handleCloseCriarCategoriaModal} className={styleModal.customModal} centered>
                <div className={styleModal.modalContainer}>
                    <ModalHeader toggle={handleCloseCriarCategoriaModal} className={styleModal.headerConfiguracoes}>
                        Criar Categoria
                    </ModalHeader>
                    <ModalBody className={styleModal.modalBodyEstimativa}>
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
                    </ModalBody>
                </div>
            </Modal>
            <Modal isOpen={CriarGastoModal} toggle={handleCloseCriarGastoModal} className={styleModal.customModal} centered>
                <div className={styleModal.modalContainer}>
                <ModalHeader toggle={handleCloseCriarGastoModal} className={styleModal.headerConfiguracoes}>
                    Criar Gasto
                </ModalHeader>
                    <ModalBody className={styleModal.modalBodyEstimativa}>
                        <Form className='CategoriaForm' onSubmit={handleCriarGasto}>
                            <FormGroup>
                                <Label for="NomeGasto">Nome do Gasto</Label>
                                <Input
                                    type="text"
                                    id="NomeGasto"
                                    value={nomeGasto}
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
                                <Input
                                    type="number"
                                    id="Quantidade"
                                    value={quantidade}
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
                    </ModalBody>
                </div>
            </Modal>
        </>
    );
}

export default InformacaoEvento;




