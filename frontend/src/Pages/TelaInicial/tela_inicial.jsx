import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style-inicial.css';
import logo from '../../assets/img/logo.png';
import home from '../../assets/img/Home.png';
import img2 from '../../assets/img/img_primeEvents2.jpg';
import img3 from '../../assets/img/img_primeEvents3.jpg';
import img4 from '../../assets/img/img_primeEvents4.jpg';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const CustomCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4700);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="custom-carousel" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      ))}
    </div>
  );
};

function TelaInicial() {
  const carouselImages = [
    { src: home, alt: 'home' },
    { src: img2, alt: 'img2' },
    { src: img3, alt: 'img3' },
    { src: img4, alt: 'img4' }
  ];

  return (
    <div>
      <Header />

      {/* Primeira Seção - Home */}
      <section
        id="primeira"
        className="d-flex justify-content-center align-items-center text-center"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <CustomCarousel images={carouselImages} />

        {/* Overlay para escurecer as imagens */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }}
        />

        {/* Texto Central */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        >
          <h1 className="text-white">Vamos tornar sua visão realidade</h1>
          <a
            href="/formulario"
            className="btn btn-warning"
            style={{ fontSize: '25px', textDecoration: 'none', marginTop: '1.5rem' }}
          >
            Monte seu projeto
          </a>
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
                  <p className="card-text">
                    Ao mergulharmos no desafio de criar eventos inesquecíveis, nos
                    deparamos com uma realidade: muitos promotores ainda recorrem a métodos manuais de
                    registro, como blocos de notas ou papel. Com determinação e profissionalismo, a Prime
                    Team decidiu dar vida à Prime Events, um sistema para gestão de eventos seletos, onde
                    cada detalhe é cuidadosamente moldado para transformar sonhos em realidade.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Nosso Objetivo</h2>
                  <p className="card-text">
                    Nosso projeto visa auxiliar os promotores de eventos que enfrentam
                    desafios no planejamento,
                    proporcionando-lhes uma solução eficaz para otimizar seu tempo e simplificar o processo
                    de organização.
                    Com nossa ferramenta, buscamos aliviar as dores comuns enfrentadas por esses
                    profissionais, oferecendo
                    um controle abrangente da lista de convidados e um sistema de orçamento de gastos
                    integrado, que permite
                    uma gestão mais eficiente e sem complicações.
                  </p>
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
          <p className="text-center mb-4">
            Nossa ferramenta oferece aos promotores de eventos uma solução
            eficiente, economizando tempo e reduzindo
            custos. Com recursos como controle automatizado de lista de convidados e análise detalhada de despesas,
            garantimos uma gestão simplificada e eficaz do evento. O diferencial está em nossa interface intuitiva e
            amigável, que simplifica a experiência do usuário, tornando a checagem e o gerenciamento de informações
            uma tarefa rápida e agradável.
          </p>

          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            className="mx-auto d-block"
            style={{ width: '300px', height: '250px' }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default TelaInicial;