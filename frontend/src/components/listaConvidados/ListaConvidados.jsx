import React, { useEffect, useState } from 'react'
import Modal from '../modal/Modal';
import styles from './listaConvidados.module.css'
import { FaLink } from "react-icons/fa";
import { atualizarConvidado, createConvidado, excluirConvidado, listarConvidadosEvento } from './api';

function ListaConvidados({ open, setOpen }) {
    const [convidadoInfo, setConvidadoInfo] = useState({
        id_evento: "",
        nome: "",
        telefone: "",
    })
    const [convidados, setConvidados] = useState([]);   
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [editar, setEditar] = useState('');

    useEffect(() => {
        fetchConvidados();
        setIsSubmitted(false);
    }, [isSubmitted]);

    const fetchConvidados = async () => {
        try {
            const id_evento = localStorage.getItem('idEvento');
            setConvidadoInfo((prevData) => ({...prevData, id_evento: id_evento}));
            const data_convidados = await listarConvidadosEvento(id_evento);
            console.log('data:', data_convidados);
            setConvidados(data_convidados);

        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleChangeConvidadoInfo = (e) => {
        const { name, value } = e.target;
        setConvidadoInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleChangeConvidado = (e, id) => {
        const { name, value } = e.target;
        setConvidados((prevData) => prevData.map((convidado) => 
            convidado.id === id ? { ...convidado, [name]: value } : convidado
        ));
    };
    const handlePresenca = (id) => {
        const atualizarPresenca = convidados.map((convidado) =>
            convidado.id === id ? { ...convidado, presenca: !convidado.presenca } : convidado
        )
        setConvidados(atualizarPresenca);
    }
    const handleSubmitConvidado = async () => {
        if (convidadoInfo.nome == "") return;
        await createConvidado(convidadoInfo);
        setConvidadoInfo((prevData) => ({...prevData, nome: "", telefone: ""}))
    }
    const handleAtualizarDadosConvidado = async () => {
        const convidadoParaAtualizar = convidados.find(convidado => convidado.id === editar); 
        await atualizarConvidado(convidadoParaAtualizar);
        console.log(convidadoParaAtualizar)
        setEditar('');
    }
    const toggleEditar = (id) => {
        setEditar(id);
    }
    const handleExcluirConvidado = async (id) => {
        setIsSubmitted(true);
        await excluirConvidado(id);
    }
    return (
    <Modal open={open} onClose={() => setOpen(false)}>               
        <div className={styles.containerModalConvidado}>
            <div className={styles.tituloModal}>
                Lista de convidados
            </div>
            <div className={styles.inputContainerRow}>
                <div className={styles.inputContainer}>    
                    <input
                        type='text'
                        name='nome'
                        value={convidadoInfo.nome}
                        onChange={handleChangeConvidadoInfo}
                        maxLength={40}
                        className={convidadoInfo.nome ? styles.hasValue : ""}
                        ></input>
                    <label className={styles.floatingLabel}>Nome: </label>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type='text'
                        name='telefone'
                        value={convidadoInfo.telefone}
                        onChange={handleChangeConvidadoInfo}
                        maxLength={11}
                        className={convidadoInfo.telefone ? styles.hasValue : ""}
                        ></input>
                    <label className={styles.floatingLabel}>Telefone: </label>
                </div>
            </div>
            <div className={styles.botoesMeio}>
            <button onClick={() => {handleSubmitConvidado(), setIsSubmitted(true)}}>Adicionar Convidado</button> <button>Gerar Link <FaLink/></button>
            </div>
            <div className={styles.containerTabela}>
                <table className={styles.containerConvidados}>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Presença</th>
                    {/*map lista*/}
                    {convidados.map((convidado) => (
                    <tr key={convidado.id_convidado}>
                        <td>
                            {editar === convidado.id ? 
                            <input type='text' name='nome' value={convidado.nome} onChange={(e) => handleChangeConvidado(e,convidado.id)}></input>
                        : convidado.nome}
                        </td>
                        <td>{editar === convidado.id ? 
                            <input type='text' name='telefone' value={convidado.telefone} onChange={(e) => handleChangeConvidado(e,convidado.id)}></input>
                        : convidado.telefone}</td>
                        
                        <td>{editar === convidado.id ? 
                            <input type='checkbox' name='presenca' checked={convidado.presenca} onChange={() => handlePresenca(convidado.id)}></input>
                        : convidado.presenca ? "Sim" : "Não"}</td>
                        <div className={styles.botaoContainerRow}>
                        {editar === convidado.id ? <td><button onClick={handleAtualizarDadosConvidado}>Alterar</button></td>:<td className={styles.botoesAlterarExcluir}><button onClick={() => toggleEditar(convidado.id)}>Editar</button></td>}
                        <td className={styles.botoesAlterarExcluir}><button onClick={() => {handleExcluirConvidado(convidado.id)}}>Excluir</button></td>
                        </div>
                    </tr>
                    ))}
                </table>
            </div>
        </div>                  
    </Modal>
  )
}

export default ListaConvidados;