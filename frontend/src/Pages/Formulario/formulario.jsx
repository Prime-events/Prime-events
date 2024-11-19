import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css';
// Certifique-se de importar ou definir a função createUser
import { createUser } from './api';
import { loginUser } from './apiLogin';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function Formulario() {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitCadastro = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await createUser({
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        email: formData.email,
        senha: formData.senha
      });
      toast.success("Conta criada com sucesso!");

      setFormData({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
      });
      setIsSignUp(false);
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);

      const status = error.response?.status || error.status;
      const message = error.response?.data?.message || error.message;

      if (status === 400) {
        toast.error("O e-mail já está em uso!");
      } else if (status) {
        toast.error(message || "Erro ao criar conta. Verifique os dados e tente novamente.");
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }

  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Lógica para autenticar o usuário ou validar o token
      navigate('/inicio');
    }
  }, [navigate]);


  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    try {
      const response = await loginUser({
        email: formData.email,
        senha: formData.senha, // Enviar a senha pura
      });
      const data = await response.json();
      if (response.ok) { // Verifique se a resposta do login foi bem-sucedida
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', formData.email);
        navigate('/inicio'); // Redirecione para a página /dashboard
      }
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);

      const status = error.response?.status || error.status;
      const message = error.response?.data?.message || error.message;

      if (status === 422) {
        toast.error("Senha inválida!");
      } else if (status === 404) {
        toast.error("Usuário não encontrado")
      } else if (status) {
        toast.error(message || "Erro ao entrar. Verifique os dados e tente novamente.");
      } else {
        toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
      }
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <body className='bodyForm'>
        <div className={`containerForm ${isSignUp ? 'active' : ''}`} id="container">
          {isSignUp ? (
            <div className="form-container sign-up">
              <form onSubmit={handleSubmitCadastro} className='formulario'>
                <h1>Criar</h1>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome"
                  value={formData.nome}
                  required
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="sobrenome"
                  placeholder="Sobrenome"
                  value={formData.sobrenome}
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
                  required
                  onChange={handleChange}
                  minLength={8}
                />
                <button type="submit">Cadastrar</button>
              </form>
            </div>
          ) : (
            <div className="form-container sign-in">
              <form onSubmit={handleSubmitLogin}>
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
                  required
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
      </body>
    </>
  );
}

export default Formulario;
