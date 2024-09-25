import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';
import Header from '../../components/header/header';


function Formulario() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const [isSignUp, setIsSignUp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição para a API de autenticação ou cadastro
    console.log('Form data:', formData);
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      <Header />
      <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
        {isSignUp ? (
          <div className="form-container sign-up">
            <form onSubmit={handleSubmit}>
              <h1>Criar</h1>
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <button type="submit">Cadastrar</button>
            </form>
          </div>
        ) : (
          <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
              <h1>Entrar</h1>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <a href="#">Esqueceu a sua senha?</a>
              <button type="submit">Entrar</button>
            </form>
          </div>
        )}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Bem vindo de volta!</h1>
              <p>Insira os seus dados pessoais para usar todos os recursos do site</p>
              <button className="hidden" onClick={toggleForm} id="login">
                Entrar
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Olá, Amigo!</h1>
              <p>Registre-se com os seus dados pessoais para usar todos os recursos do site</p>
              <button className="hidden" onClick={toggleForm} id="register">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Formulario;
