// ContactForm.jsx
import { useState } from 'react';
import styles from './ajuda.module.css';
import SegundoHeader from '../../components/header/segundoHeader/segundoHeader';
import SideBar from '../../components/sideBar/sideBar';

const Ajuda = () => {
  const faqs = [
    {
      questao: 'Como criar um evento?',
      resposta: 'Acesse a página de eventos, clique no botão criar evento, preencha os campos obrigatórios e clique em "Salvar".',
    },
    {
      questao: 'Posso editar um evento depois de criado?',
      resposta: 'Sim, você pode editar os detalhes de um evento acessando a página de edição através da informação do evento.',
    },
    {
      questao: 'Como gerenciar convidados do evento?',
      resposta: 'Na página de informações de evento, no botão lista de convidados, você pode adicionar, remover ou editar informações dos convidados.',
    },
    {
      questao: 'Como gerenciar orçamento?',
      resposta: 'Na página de informações de evento, no botão estimativa de gastos, você pode adicionar, remover ou editar o orçamento.',
    },
    {
      questao: 'O que é categoria?',
      resposta: 'A Categoria serve para classificar os produtos adicionados na estimativa de gastos, para facilitar a visualização de gastos',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleresposta = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
		<SegundoHeader titulo="Ajuda" />
		<div className={styles.container}>
			<SideBar />
			<div className={styles.faq}>
				<h1>Perguntas Frequentes</h1>
				{faqs.map((faq, index) => (
				<div key={index} className={styles.item}>
				<div
					className={styles.questoes}
					onClick={() => toggleresposta(index)}
					>
					{faq.questao}
				</div>
				{activeIndex === index && <div className={styles.respostas}>{faq.resposta}</div>}
				</div>
			))}
			</div>
    </div>
    </>
  );
};

export default Ajuda;
