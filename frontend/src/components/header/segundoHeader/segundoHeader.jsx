import React, { useEffect, useState } from 'react';
import imgLogo from '../../../assets/img/logo 1.png';
import perfil from '../../../assets/img/imgPerfilPE.png';
import styles from "./SegundoHeader.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, FormGroup, Label, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { VscBellDot } from "react-icons/vsc";
import { listarEventosPendentes } from '../../../Pages/Dashboard/dashApi';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { GoGear } from "react-icons/go";
import { PiGearSixLight } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { getUser } from './api';
import { updateUser } from './apiUpdate';
import { updateUserEmail } from './apiUpdate';
import { updateUserSenha } from './apiUpdate';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SegundoHeader({ titulo }) {
    const navigate = useNavigate();
    const [configModal, setConfigModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [activeTab, setActiveTab] = useState('geral');
    const [theme, setTheme] = useState('Sistema');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentPasswordChange, setCurrentPasswordChange] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [corPerfil, setCorPerfil] = useState('');
    const [perfil, setPerfil] = useState('');
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if(!localStorage.getItem('token')){
                    console.error('É preciso fazer login para ter acesso');
                    navigate('/formulario');
                }
                const email = localStorage.getItem('email');
                if (!email) {
                    console.error('Email não encontrado no localStorage');
                    return;
                }
                console.log('Email from localStorage:', email);
                setCurrentEmail(email);

                const data = await getUser(email);
                console.log('Dados do usuário:', data);

                const { nome, sobrenome, corPerfil } = data;
                setNome(nome);
                setSobrenome(sobrenome);
                setNomeCompleto(`${nome} ${sobrenome}`);
                setPerfil(`${nome.substring(0, 1)}${sobrenome.substring(0, 1)}`);
                setPerfil(`${nome.substring(0, 1).toUpperCase()}${sobrenome.substring(0, 1).toUpperCase()}`);
                setCorPerfil(corPerfil);
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        fetchUserData();
    }, [navigate]);

    const toggleConfigModal = () => {
        setConfigModal(!configModal);
        if (!configModal) {
            setActiveTab('geral');
        }
    };

    const handleEmailModalOpen = () => {
        setConfigModal(false);
        setEmailModal(true);
        setNewEmail('');
        setCurrentPassword('');
    };

    const handleEmailModalClose = () => {
        setEmailModal(false);
        setConfigModal(true);
        setNewEmail('');
        setCurrentPassword('');
    };

    const handlePasswordModalOpen = () => {
        setConfigModal(false);
        setPasswordModal(true);
        setCurrentPasswordChange('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
    };

    const handlePasswordModalClose = () => {
        setPasswordModal(false);
        setConfigModal(true);
        setCurrentPasswordChange('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (newPassword !== confirmPassword) {
            setPasswordError('As senhas não coincidem');
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError('A senha deve ter pelo menos 8 caracteres');
            return;
        }

        try {
            const atualizacao = {
                currentPasswordChange,
                newPassword,
                confirmPassword
            };
            const response = await updateUserSenha(currentEmail, atualizacao);
            setCurrentPasswordChange(newPassword);
            handlePasswordModalClose();
            toast.success("Senha atualizada com sucesso!");

        } catch (error) {
            console.error('Erro ao atualizar senha:', error);

            const status = error.response?.status || error.status;
            const message = error.response?.data?.message || error.message;

            if (status === 422) {
                toast.error("Senha atual incorreta!");
            } else if (status) {
                toast.error(message || "Erro ao atualizar senha. Verifique os dados e tente novamente.");
            } else {
                toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        }
    };

    const handleEmailChange = async (e) => {
        e.preventDefault();

        try {
            const updates = {
                currentPassword,
                newEmail
            };

            const response = await updateUserEmail(currentEmail, updates);

            localStorage.setItem('email', newEmail);
            setCurrentEmail(newEmail);
            handleEmailModalClose();
            toast.success("Email atualizado com sucesso!");

        } catch (error) {

            console.error('Erro ao atualizar email:', error);

            const status = error.response?.status || error.status;
            const message = error.response?.data?.message || error.message;

            if (status === 422) {
                toast.error("Senha atual incorreta!");
            } else if (status) {
                toast.error(message || "Erro ao atualizar email. Verifique os dados e tente novamente.");
            } else {
                toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
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

        toggleConfigModal();
    };

    useEffect(() => {

        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            const email = localStorage.getItem('email');
            const data_usuario = await getUser(email);
            const { id_usuario } = data_usuario;

            // Log para verificar o id_usuario
            console.log('id_usuario:', id_usuario);

            const data_eventos = await listarEventosPendentes(id_usuario);

            // Log para verificar os eventos retornados
            console.log('data_eventos:', data_eventos);

            setEventos(data_eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
        }
    };

    const handleRedirect = (id_evento) => {
        localStorage.setItem('idEvento', id_evento);
        navigate('/informacaoEvento');
    }

    return (
        <>

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
                        <UncontrolledDropdown group>
                            <DropdownToggle tag="span" className={styles.iconDropdown}>
                                <VscBellDot />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header className={styles.dropdownItemHeader}>
                                    Notificação
                                </DropdownItem>
                                {eventos
                                    .filter((evento) => {
                                        if (!evento.dataHoraInicial) {
                                            return false;
                                        }
                                        const dataHoraInicial = new Date(evento.dataHoraInicial);
                                        const agora = new Date();
                                        const diferencaMilissegundos = dataHoraInicial - agora;
                                    
                                        // Convertendo a diferença de milissegundos para horas e minutos
                                        const diferencaTotalMinutos = diferencaMilissegundos / (1000 * 60);
                                        const diferencaHoras = Math.floor(diferencaTotalMinutos / 60);
                                        const diferencaMinutos = Math.floor(diferencaTotalMinutos % 60);
                                    
                                        evento.diferencaHoras = diferencaHoras;
                                        evento.diferencaMinutos = diferencaMinutos;
                                    
                                        return diferencaHoras <= 24 && diferencaHoras >= 0;
                                    })
                                    .map((evento) => (
                                        <DropdownItem key={evento.id_evento} className={styles.dropdownItem} onClick={() => handleRedirect(evento.id_evento)}>
                                            <span className={styles.dropdownCell}>{evento.nomeEvento} irá começar em {evento.diferencaHoras.toFixed(0)} hora(s) e {evento.diferencaMinutos.toFixed(0)} minuto(s)!</span>
                                        </DropdownItem>
                                    ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        </div>
                        <div className={styles.userLogado}>
                            <div className={styles.perfil} style={{ backgroundColor: corPerfil }}><span className={styles.iniciaisPerfil}>{perfil}</span></div>
                            <div className={styles.nome}>
                                <span>{nomeCompleto}</span>
                            </div>
                            <div className={styles.dropDown}>
                                <UncontrolledDropdown group>
                                    <DropdownToggle tag="span" className={styles.iconDropdown}>
                                        <RiArrowDropDownLine />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={toggleConfigModal}>
                                            <GoGear />
                                            <span className={styles.optionText}>Configurações</span>
                                        </DropdownItem>
                                        <DropdownItem onClick={handleLogout}>
                                            <Link className={styles.logoutLink}>
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

                {/* Modal de Configurações */}
                <Modal isOpen={configModal} toggle={toggleConfigModal} className={styles.customModal} centered>
                    <div className={styles.modalContainer}>
                        <ModalHeader toggle={toggleConfigModal} className={styles.headerConfiguracoes}>
                            Configurações
                        </ModalHeader>
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
                                        </div>
                                    )}
                                    {activeTab === 'perfil' && (
                                        <div className={styles.configuracoesPerfil}>
                                            <Form className={styles.formularioPerfil}>
                                                <Row>
                                                    <FormGroup className={styles.formNome}>
                                                        <Label for="exampleNome">Nome *</Label>
                                                        <Input
                                                            className={styles.inputNome}
                                                            id="exampleNome"
                                                            name="nome"
                                                            type="text"
                                                            maxLength={15}
                                                            placeholder={nome}
                                                            value={nome}
                                                            onChange={e => setNome(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup className={styles.formSobrenome}>
                                                        <Label for="exampleSobrenome">Sobrenome *</Label>
                                                        <Input
                                                            className={styles.inputSobreNome}
                                                            id="exampleNome"
                                                            name="nome"
                                                            maxLength={15}
                                                            type="text"
                                                            placeholder={sobrenome}
                                                            value={sobrenome}
                                                            onChange={e => setSobrenome(e.target.value)}
                                                        />
                                                    </FormGroup>
                                                </Row>
                                            </Form>
                                            <div className={styles.itensEmail}>
                                                <div className={styles.email}>
                                                    <label style={{ fontWeight: 'bold' }}>Email</label>
                                                    <span style={{ color: '#545454', fontWeight: '600' }}>{currentEmail}</span>
                                                </div>
                                                <button id={styles.btnAlterEmail} onClick={handleEmailModalOpen}>
                                                    Alterar e-mail
                                                </button>
                                            </div>
                                            <div className={styles.trocarSenha}>
                                                <button id={styles.btnAlterSenha} onClick={handlePasswordModalOpen}>
                                                    Trocar Senha
                                                </button>
                                            </div>
                                            <div className={styles.encerrarConta}>
                                                <button className={styles.btnEncerrarConta}>
                                                    <span className={styles.txtEncerrarConta}>Encerrar a minha conta</span>
                                                </button>
                                            </div>
                                            <div className={styles.salvar}>
                                                <button id={styles.btnSalvar} onClick={handleNomeSobrenome}>
                                                    Salvar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ModalBody>
                    </div>
                </Modal>

                {/* Modal de Alteração de Email */}
                <Modal isOpen={emailModal} toggle={handleEmailModalClose} className={styles.customModal} centered>
                    <div className={styles.modalContainer}>
                        <ModalHeader toggle={handleEmailModalClose} className={styles.headerConfiguracoes}>
                            Alterar E-mail
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handleEmailChange} className={styles.emailForm}>
                                <FormGroup>
                                    <Label for="currentEmail">E-mail Atual</Label>
                                    <Input
                                        type="email"
                                        id="currentEmail"
                                        value={currentEmail}
                                        disabled
                                        className={styles.inputDisabled}
                                    />
                                </FormGroup>
                                <FormGroup className={styles.floatingGroup}>
                                    <Input
                                        type="email"
                                        id="newEmail"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                        className={`${styles.inputEmail} ${newEmail ? 'hasValue' : ''}`}
                                        placeholder=" "
                                    />
                                    <Label
                                        for="newEmail"
                                        className={styles.floatingLabel}
                                    >
                                        Novo E-mail *
                                    </Label>
                                </FormGroup>
                                <FormGroup className={styles.floatingGroup}>
                                    <Input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className={`${styles.inputPassword} ${currentPassword ? 'hasValue' : ''}`}
                                        placeholder=" "
                                    />
                                    <Label
                                        for="currentPassword"
                                        className={styles.floatingLabel}
                                    >
                                        Senha Atual *
                                    </Label>
                                </FormGroup>
                                <div className={styles.emailModalButtons}>
                                    <Button
                                        type="button"
                                        className={styles.btnCancelar}
                                        onClick={handleEmailModalClose}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={styles.btnSalvar}
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </div>
                </Modal>

                {/* Modal de Alteração de Senha */}
                <Modal isOpen={passwordModal} toggle={handlePasswordModalClose} className={styles.customModal} centered>
                    <div className={styles.modalContainer}>
                        <ModalHeader toggle={handlePasswordModalClose} className={styles.headerConfiguracoes}>
                            Alterar Senha
                        </ModalHeader>
                        <ModalBody>
                            <Form onSubmit={handlePasswordChange} className={styles.passwordForm}>
                                <FormGroup className={styles.floatingGroup}>
                                    <Input
                                        type="password"
                                        id="currentPasswordChange"
                                        value={currentPasswordChange}
                                        onChange={(e) => setCurrentPasswordChange(e.target.value)}
                                        required
                                        className={`${styles.inputPassword} ${currentPasswordChange ? 'hasValue' : ''}`}
                                        placeholder=" "
                                    />
                                    <Label
                                        for="currentPasswordChange"
                                        className={styles.floatingLabel}
                                    >
                                        Senha Atual *
                                    </Label>
                                </FormGroup>
                                <FormGroup className={styles.floatingGroup}>
                                    <Input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className={`${styles.inputPassword} ${newPassword ? 'hasValue' : ''}`}
                                        placeholder=" "
                                        minLength={8}
                                    />
                                    <Label
                                        for="newPassword"
                                        className={styles.floatingLabel}
                                    >
                                        Nova Senha *
                                    </Label>
                                </FormGroup>
                                <FormGroup className={styles.floatingGroup}>
                                    <Input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className={`${styles.inputPassword} ${confirmPassword ? 'hasValue' : ''}`}
                                        placeholder=" "
                                        minLength={8}
                                    />
                                    <Label
                                        for="confirmPassword"
                                        className={styles.floatingLabel}
                                    >
                                        Confirmar Senha *
                                    </Label>
                                </FormGroup>
                                {passwordError && (
                                    <div className={styles.errorMessage} style={{ color: 'red', marginBottom: '1rem' }}>
                                        {passwordError}
                                    </div>
                                )}
                                <div className={styles.passwordModalButtons}>
                                    <Button
                                        type="button"
                                        className={styles.btnCancelar}
                                        onClick={handlePasswordModalClose}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        className={styles.btnSalvar}
                                    >
                                        Salvar
                                    </Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </div>
                </Modal>
            </header>
        </>
    );
}

export default SegundoHeader;