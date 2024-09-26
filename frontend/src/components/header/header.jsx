import styles from "./Header.module.css";

function Header() {
    return (
        <>
            {/* Navbar */}
            <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbarBackground}`}>
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <h3>PRIME <br /><p className={styles.subTitle}>EVENTS</p></h3>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">HOME</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#segunda">SOBRE NÓS</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#terceira">SERVIÇO</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/formulario">CADASTRAR OU ENTRAR</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
