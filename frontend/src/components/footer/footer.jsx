function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-dark text-light py-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-4">
                            <h4>Time</h4>
                            <ul className="list-unstyled">
                                <li><a href="#segunda" className="text-light">Quem somos</a></li>
                                <li><a href="#terceira" className="text-light">Nossos serviços</a></li>
                                <li><a href="#" className="text-light">Política de privacidade</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h4>Obter ajuda</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light">Contato</a></li>
                                <li><a href="#" className="text-light">Github</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-0">&copy; 2024 Team. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;