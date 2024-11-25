import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import styles from "./Header.module.css";

function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    // Função para controlar o toggle do menu mobile
    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    // Efeito para monitorar o scroll da página
    useEffect(() => {
        const handleScroll = () => {
            // Verifica se o scroll passou de 80px
            const isScrolled = window.scrollY > 80;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Adiciona o event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup: remove o event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setCollapsed(true);
    };

    return (
        <div>
            <Navbar
                className={`navbar navbar-expand-lg navbar-dark fixed-top ${
                    styles.navbarBackground
                } ${scrolled ? styles.navbarScrolled : ''}`}
                light
            >
                <div className={`${styles.containerHeader}`}>
                    <NavbarBrand href="/" className="me-auto">
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
                            <h3 style={{ margin: 0 }}>PRIME</h3>
                            <span className={styles.subTitle} style={{ margin: 0 }}>EVENTS</span>
                        </div>
                    </NavbarBrand>

                    <NavbarToggler onClick={toggleNavbar} className={`me-2 ${styles.navbarToggler}`} />
                    <Collapse isOpen={!collapsed} navbar>
                        <Nav className="ms-auto" navbar style={{ textAlign: 'center' }}>
                            <NavItem>
                                <NavLink 
                                    href="#primeira" 
                                    className="active" 
                                    aria-current="page" 
                                    onClick={(e) => scrollToSection(e, '#primeira')}
                                    style={{ textDecoration: 'none' }}
                                >
                                    HOME
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink 
                                    href="#segunda" 
                                    onClick={(e) => scrollToSection(e, '#segunda')}
                                    style={{ textDecoration: 'none' }}
                                >
                                    SOBRE NÓS
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink 
                                    href="#terceira" 
                                    onClick={(e) => scrollToSection(e, '#terceira')}
                                    style={{ textDecoration: 'none' }}
                                >
                                    SERVIÇO
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/formulario" style={{ textDecoration: 'none' }}>
                                    ENTRAR
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;