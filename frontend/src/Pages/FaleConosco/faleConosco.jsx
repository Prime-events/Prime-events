// ContactForm.jsx
import React, { useState } from 'react';
import styles from './faleConosco.module.css';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader';
import SideBar from '../../components/sideBar/sideBar';

const FaleConosco = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({ subject: '', message: '' });
  };

  return (
    <>
        <SegundoHeader titulo='Informações evento' />
        <div className={styles.container}>
            <SideBar />
            <form className={styles.contatoForm} onSubmit={handleSubmit}>
            <label htmlFor="subject">Assunto</label>
            <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Digite o assunto"
                required
                />

            <label htmlFor="message">Mensagem</label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Digite sua mensagem"
                rows="5"
                required
                ></textarea>

            <button type="submit">Enviar</button>
            </form>
        </div>
    </>
  );
};

export default FaleConosco;
