import { useState } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import styles from "./Header.module.css";

function Header() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div>
            <Navbar className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbarBackground}`} light>
                <div className={`${styles.containerHeader}`}>
                    <NavbarBrand href="/" className="me-auto">
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                            <h4>PRIME</h4>
                            <span className={styles.subTitle}>EVENTS</span>
                        </div>
                    </NavbarBrand>

                    <NavbarToggler onClick={toggleNavbar} className="me-2" />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <NavLink href="/" className="active" aria-current="page">HOME</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#segunda">SOBRE NÓS</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#terceira">SERVIÇO</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/formulario">CADASTRAR OU ENTRAR</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;
