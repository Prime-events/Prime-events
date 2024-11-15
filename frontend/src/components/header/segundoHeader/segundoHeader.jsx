import React, { useEffect, useState } from 'react';
import imgLogo from '../../../assets/img/logo 1.png';
import perfil from '../../../assets/img/imgPerfilPE.png';
import styles from "./SegundoHeader.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { VscBellDot } from "react-icons/vsc";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { GoGear } from "react-icons/go";
import { PiGearSixLight } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import {getUser} from './api';
import {updateUser} from './apiUpdate';


function SegundoHeader({titulo}) {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState('geral');
    const [theme, setTheme] = useState('Sistema'); // Estado para o tema
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                console.error('Email não encontrado no localStorage');
                return;
                }
                console.log('Email from localStorage:', email);
    
                const data = await getUser(email);
                console.log('Dados do usuário:', data);
    
                const { nome, sobrenome } = data;
                setNome(nome);
                setSobrenome(sobrenome);
                setNomeCompleto(`${nome} ${sobrenome}`);
            } catch (error) {
                console.error('Erro:', error);
            }
            };
    
            fetchUserData();
        }, []);

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) { // Se o modal estiver sendo aberto
            setActiveTab('geral'); // Redefine a aba ativa para 'geral'
        }
    };


    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Redirecione para a página de login
    };

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        console.log(`Tema selecionado: ${selectedTheme}`);
    };

    const handleNomeSobrenome = async () => {
        setNomeCompleto(nome + " " + sobrenome);

        try {
        const email = localStorage.getItem('email');
        const updates = { nome, sobrenome };
        const updatedUser = await updateUser(email, updates);
        console.log('Usuário atualizado:', updatedUser);
        } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        }

        toggleModal();
    };

    return (
        <header className={styles.header}>
            <div className={styles.itensHeader}>
                <div className={styles.itensEsquerda}>
                    <div className={styles.logo}>
                        <Link to="/" className={styles.logoLink}>
                            <img src={imgLogo} alt="Logo Prime Events" className={styles.imagemLogo} />
                            <span className={styles.nomeLogo}>Prime Events</span>
                        </Link>
                    </div>

                    <span className={styles.itemBarra}>|</span>

                    <span className={styles.tituloTela}>{titulo}</span>

                </div>
                <div className={styles.itensDireita}>
                    <div className={styles.notificacao} aria-label="Notificações">
                        <VscBellDot />
                    </div>
                    <div className={styles.userLogado}>
                        <img src={perfil} alt="perfil" className={styles.perfil} />
                        <div className={styles.nome}>
                            <span>{nomeCompleto}</span>
                        </div>
                        <div className={styles.dropDown}>
                            <UncontrolledDropdown group>
                                <DropdownToggle tag="span" className={styles.iconDropdown}>
                                    <RiArrowDropDownLine />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Header</DropdownItem>
                                    <DropdownItem onClick={toggleModal}>
                                        <GoGear />
                                        <span className={styles.optionText}>Configurações</span>
                                    </DropdownItem>
                                    <DropdownItem onClick={handleLogout}>
                                        <Link  className={styles.logoutLink}>
                                            <FiLogOut />
                                            <span className={styles.optionText}>Sair</span>
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={modal} toggle={toggleModal} className={styles.customModal} centered>
                <div className={styles.modalContainer}>
                    <ModalHeader toggle={toggleModal} className={styles.headerConfiguracoes}>Configurações</ModalHeader>
                    <ModalBody>
                        <div className={styles.itensModal}>
                            <div className={styles.configItensEsquerda}>
                                <div className={styles.opcoes}>
                                    <div
                                        className={`${styles.geral} ${activeTab === 'geral' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('geral')}
                                    >
                                        <PiGearSixLight className={styles.optionIcon} />
                                        <span>Geral</span>
                                    </div>

                                    <div
                                        className={`${styles.perfilConfig} ${activeTab === 'perfil' ? styles.active : ''}`}
                                        onClick={() => setActiveTab('perfil')}
                                    >
                                        <RiUserSettingsLine className={styles.optionIcon} />
                                        <span>Perfil</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.configItensDireita}>
                                {activeTab === 'geral' && (
                                    <div className={styles.configuracoesGerais}>
                                        <div className={styles.tema}>
                                            <div className={styles.itensTema}>
                                                <div className={styles.txtTema}>
                                                    <span>Tema</span>
                                                </div>
                                                <div className={styles.themeDropdown}>
                                                    <UncontrolledDropdown>
                                                        <DropdownToggle caret className={styles.btnTema}>
                                                            {theme}
                                                        </DropdownToggle>
                                                        <DropdownMenu className={styles.dropDownTema}>
                                                            <DropdownItem onClick={() => handleThemeChange('Sistema')} className={styles.temaSistema}>
                                                                Sistema
                                                                {theme === 'Sistema' && <IoIosCheckmarkCircle className={styles.selectedIcon} />}
                                                            </DropdownItem>
                                                            <DropdownItem onClick={() => handleThemeChange('Escuro')} className={styles.temaEscuro}>
                                                                Escuro
                                                                {theme === 'Escuro' && <IoIosCheckmarkCircle className={styles.selectedIcon} />}
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </div>
                                            </div>
                                        </div>
                                        <br></br>
                                        <span>configurações gerais</span> 
                                        <span>configurações gerais</span> 
                                    </div>
                                )}
                                {activeTab === 'perfil' && (
                                    <div className={styles.configuracoesPerfil}>
                                        <Form className={styles.formularioPerfil}>
                                            <Row>
                                                <FormGroup className={styles.formNome}>
                                                    <Label for="exampleNome">Nome *</Label>
                                                    <Input className={styles.inputNome} id="exampleNome" name="nome" type="text" maxLength={15} placeholder={nome} value={nome} onChange={e => setNome(e.target.value)} />
                                                </FormGroup>
                                                <FormGroup className={styles.formSobrenome}>
                                                    <Label for="exampleSobrenome">Sobrenome *</Label>
                                                    <Input className={styles.inputSobreNome} id="exampleNome" name="nome" maxLength={15} type="text" placeholder={sobrenome} value={sobrenome} onChange={e => setSobrenome(e.target.value)} />
                                                </FormGroup>
                                            </Row>
                                        </Form>
                                        <div className={styles.itensEmail}>
                                            <div className={styles.email}>
                                                <label style={{ fontWeight: 'bold' }}>Email</label>
                                                <span style={{ color: '#545454', fontWeight: '600' }}>uesleitest@gmail.com</span>
                                            </div>
                                            <button id={styles.btnAlterEmail}>Alterar e-mail</button>
                                        </div>
                                        <div className={styles.trocarSenha}>
                                            <button id={styles.btnAlterSenha}>Trocar Senha</button>
                                        </div>
                                        <div className={styles.encerrarConta}>
                                            <button className={styles.btnEncerrarConta}>
                                                <span className={styles.txtEncerrarConta}>Encerrar a minha conta</span>
                                            </button>
                                        </div>
                                        <div className={styles.salvar}>
                                            <button id={styles.btnSalvar} onClick={handleNomeSobrenome}>Salvar</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ModalBody>
                </div>
            </Modal>
        </header>
    );
}

export default SegundoHeader;

