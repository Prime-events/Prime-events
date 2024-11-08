function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-dark text-light py-5">
                <div className="container">
                    <div className="rodape" style={{display: "flex", justifyContent: 'center', gap: '10rem'}}>
                        <div className="time" style={{textAlign: "center"}}>
                            <p style={{ fontSize: '2rem', fontWeight: '700'}}>Time</p>
                            <ul className="list-unstyled">
                                <li><a href="#segunda" className="text-light"  style={{ textDecoration: 'none', fontSize: '1.2rem'}}>Quem somos</a></li>
                                <li><a href="#terceira" className="text-light"  style={{ textDecoration: 'none', fontSize: '1.2rem'}}>Nossos serviços</a></li>
                                <li><a href="#" className="text-light"  style={{ textDecoration: 'none', fontSize: '1.2rem'}}>Política de privacidade</a></li>
                            </ul>
                        </div>
                        <div className="contatos" style={{textAlign: "center"}}>
                            <p style={{ fontSize: '2rem', fontWeight: '700'}}>Obter ajuda</p>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '1.2rem' }}>Github</a></li>
                                <li><a href="#" className="text-light" style={{ textDecoration: 'none', fontSize: '1.2rem'}}>Contato</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-0" style={{marginTop: '4rem', fontSize: '1rem'}}>&copy; 2024 Team. Todos os direitos reservados.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;