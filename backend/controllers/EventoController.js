const sequelize = require('../config/db');
const Evento = require('../models/Evento');
const {Op} = require("sequelize");

class EventoController {
    static criarEvento = async (req, res) => {
        try {
            const evento = await Evento.create(req.body);
            res.status(201).json({ message: "Evento criado com sucesso!", evento });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static listarEventos = async (req, res) => {
        try {
            const eventos = await Evento.findAll();
            res.status(201).json(eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos: ', error);
            res.status(404).json({ message: 'Erro ao buscar eventos!' });
        }
    }

    static listarEventosPendentes = async (req, res) => {
        console.log("ID do Usuário recebido:", req.params.id_usuario);

        try {
            const eventos = await Evento.findAll({
                where: {
                    id_usuario: req.params.id_usuario,
                    status: 'Pendente'
                },
                order: [
                    ['dataHoraInicial', 'ASC']
                ],
                limit: 2
            });
            res.status(200).json(eventos);
        } catch (error) {
            console.error("Erro ao buscar eventos pendentes: ", error);
            res.status(404).json({ message: "Erro ao buscar eventos pendentes!" });
        }
    };

    static listarEventoPorId = async (req, res) => {
        try {
            const evento = await Evento.findByPk(req.params.id_evento);
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }
            res.status(200).json(evento);
        } catch (error) {
            console.error('Erro ao buscar evento!');
            res.status(404).json({ message: 'Erro ao buscar evento!' });
        }
    }


    static listarEventoPorNome = async (req, res) => {
        const nomeEvento = req.params.nomeEvento;
        try {
            const evento = await Evento.findAll({
                where: {
                    nomeEvento: {
                        [Op.like]: `%${nomeEvento}%`
                    }
                }
            });
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }
            res.status(200).json(evento);
        } catch (error) {
            console.error('Erro ao buscar evento:', error.message);
            res.status(500).json({ message: 'Erro ao buscar evento!' });
        }
    };


    static buscarEventoPorDataHora = async (req, res) => {
        try {
            const { dataHoraInicial } = req.query;
    
            // Validar se a data foi fornecida
            if (!dataHoraInicial) {
                return res.status(400).json({ 
                    mensagem: 'Data e hora são obrigatórias para busca' 
                });
            }
    
            // Busca exata por data e hora
            const evento = await Evento.findOne({
                where: {
                    dataHoraInicial: {
                        [Op.eq]: new Date(dataHoraInicial)
                    }
                }
            });
    
            // Caso não encontre o evento
            if (!evento) {
                return res.status(404).json({ 
                    mensagem: 'Nenhum evento encontrado para esta data e hora' 
                });
            }
    
            // Retorna o evento encontrado
            return res.status(200).json(evento);
        } catch (error) {
            console.error('Erro ao buscar evento:', error);
            return res.status(500).json({ 
                mensagem: 'Erro interno do servidor', 
                erro: error.message 
            });
        }
    };



    static listarEventosUsuario = async (req, res) => {
        try {
            const eventos = await Evento.findAll({
                where: {
                    id_usuario: req.params.id_usuario
                },
                order: [
                    ['dataHoraInicial', 'ASC']
                ]
            });

            if (!eventos || eventos.length === 0) {
                return res.status(404).json({ message: 'Nenhum evento encontrado!' });
            }

            res.status(200).json(eventos);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            res.status(500).json({ message: 'Erro interno ao buscar eventos!' });
        }
    }



    static atualizarEvento = async (req, res) => {
        const id = req.params.id;
        try {
            const evento = await Evento.findByPk(id);
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado!' });
            }
            await evento.update(req.body);
            res.status(200).json({ message: "Evento atualizado com sucesso!", evento });
        } catch (error) {
            console.error('Erro ao atualizar evento: ', error);
            res.status(500).json({ message: 'Erro ao atualizar evento!' });
        }

    }
    
    

    static deletarEvento = async (req, res) => {
        const id = req.params.id;
        try {
            await Evento.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({ message: 'Evento deletado com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar evento: ', error);
            res.status(500).json({ message: 'Erro ao deletar evento!' });
        }
    }
}

module.exports = EventoController;