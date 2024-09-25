import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style-inicial.css';
import logo from '../../assets/img/logo.png'; 
import home from '../../assets/img/Home.png';
import Header from '../../components/header/header';

function telaInicial() {
  return (
    <div>
      <Header />
      {/* Primeira Seção - Home */}
      <section id="primeira" className="d-flex justify-content-center align-items-center text-center"
        style={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${home})`, 
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>

        {/* Texto Central */}
        <div>
          <h1 className="text-white" style={{ fontSize: '60px' }}>Vamos tornar sua visão realidade</h1>
          <a href="#" className="btn btn-warning">Monte seu projeto</a>
        </div>
      </section>

      {/* Segunda Seção - Sobre Nós */}
      <section id="segunda" className="text-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h2 className="card-title">Sobre nós</h2>
                  <p className="card-text">Ao mergulharmos no desafio de criar eventos inesquecíveis, nos
                    deparamos com uma realidade: muitos promotores ainda recorrem a métodos manuais de
                    registro, como blocos de notas ou papel. Com determinação e profissionalismo, a Prime
                    Team decidiu dar vida à Prime Events, um sistema para gestão de eventos seletos, onde
                    cada detalhe é cuidadosamente moldado para transformar sonhos em realidade.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Nosso Objetivo</h2>
                  <p className="card-text">Nosso projeto visa auxiliar os promotores de eventos que enfrentam
                    desafios no planejamento,
                    proporcionando-lhes uma solução eficaz para otimizar seu tempo e simplificar o processo
                    de organização.
                    Com nossa ferramenta, buscamos aliviar as dores comuns enfrentadas por esses
                    profissionais, oferecendo
                    um controle abrangente da lista de convidados e um sistema de orçamento de gastos
                    integrado, que permite
                    uma gestão mais eficiente e sem complicações.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terceira Seção - Serviços */}
      <section id="terceira" className="py-5">
        <div className="container">
          <h1 className="text-center mb-4">PRIME EVENTS</h1>
          <p className="text-center mb-4">Nossa ferramenta oferece aos promotores de eventos uma solução
            eficiente, economizando tempo e reduzindo
            custos. Com recursos como controle automatizado de lista de convidados e análise detalhada de despesas,
            garantimos uma gestão simplificada e eficaz do evento. O diferencial está em nossa interface intuitiva e
            amigável, que simplifica a experiência do usuário, tornando a checagem e o gerenciamento de informações
            uma tarefa rápida e agradável.</p>
          {/* Logo */}
          <img src={logo} alt="logo" className="mx-auto d-block" style={{ width: '400px', height: '250px' }} />
        </div>
      </section>

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
    </div>
  );
}

export default telaInicial;
