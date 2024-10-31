import React, { useState } from 'react';
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

<<<<<<< HEAD
function SegundoHeader({titulo}) {
=======
function SegundoHeader() {
>>>>>>> bedfefa1815f9d100d55c02e08d837da73f5b1e6
    const [modal, setModal] = useState(false);
    const [activeTab, setActiveTab] = useState('geral');
    const [theme, setTheme] = useState('Sistema'); // Estado para o tema

    const toggleModal = () => {
        setModal(!modal);
        if (!modal) { // Se o modal estiver sendo aberto
            setActiveTab('geral'); // Redefine a aba ativa para 'geral'
        }
    };

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        console.log(`Tema selecionado: ${selectedTheme}`);
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
<<<<<<< HEAD
                    <span className={styles.tituloTela}>{titulo}</span>
=======
                    <span className={styles.tituloTela}>Dashboard</span>
>>>>>>> bedfefa1815f9d100d55c02e08d837da73f5b1e6
                </div>
                <div className={styles.itensDireita}>
                    <div className={styles.notificacao} aria-label="Notificações">
                        <VscBellDot />
                    </div>
                    <div className={styles.userLogado}>
                        <img src={perfil} alt="perfil" className={styles.perfil} />
                        <div className={styles.nome}>
                            <span>Jhon Doe</span>
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
                                    <DropdownItem>
                                        <Link to="/" className={styles.logoutLink}>
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
                                                    <Input className={styles.inputNome} id="exampleNome" name="nome" type="text" value='Ueslei' />
                                                </FormGroup>
                                                <FormGroup className={styles.formSobrenome}>
                                                    <Label for="exampleSobrenome">Sobrenome *</Label>
                                                    <Input className={styles.inputSobrenome} id="exampleSobrenome" name="sobrenome" type="text" value='Lima' />
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
                                            <button id={styles.btnSalvar}>Salvar</button>
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
