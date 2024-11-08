import { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import styles from "./Header.module.css";

function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <Navbar
                className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? styles.navbarScrolled : styles.navbarBackground
                    }`}
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
                                <NavLink href="/" className="active" aria-current="page" style={{ textDecoration: 'none' }}>
                                    HOME
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#segunda" style={{ textDecoration: 'none' }}>SOBRE NÓS</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#terceira" style={{ textDecoration: 'none' }}>SERVIÇO</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/formulario" style={{ textDecoration: 'none' }}>ENTRAR</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;