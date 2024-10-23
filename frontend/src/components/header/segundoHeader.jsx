import imgLogo from '../../assets/img/logo 1.png';
import perfil from '../../assets/img/imgPerfilPE.png';
import styles from "./SegundoHeader.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { VscBellDot } from "react-icons/vsc";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { GoGear } from "react-icons/go";


function segundoHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.itensHeader}>
                <div className={styles.itensEsquerda}>
                    <div className={styles.logo}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                            <img src={imgLogo} alt="Logo Prime Events" className={styles.imagemLogo} />
                            <span className={styles.nomeLogo}>Prime Events</span>
                        </Link>
                    </div>

                    <span className={styles.itemBarra}>|</span>
                    <span className={styles.tituloTela}>Dashboard</span>
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
                                    <DropdownItem header>
                                        Header
                                    </DropdownItem>
                                    <DropdownItem text>
                                        <GoGear />
                                        <span style={{ marginLeft: '0.4rem' }}>Configurações</span>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to="/" style={{ textDecoration: 'none', color: 'red', display: 'flex', alignItems: 'center' }}>
                                            <FiLogOut />
                                            <span style={{ marginLeft: '0.4rem' }}>Sair</span>
                                        </Link>
                                    </DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}


export default segundoHeader;