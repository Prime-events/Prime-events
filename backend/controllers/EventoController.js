const Evento = require('../models/Evento');

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

    static listarEventoPorId = async (req, res) => {
        const id = req.params.id_evento;
        try {
            const evento = await Evento.findByPk(id);
            if (!evento) {
                res.status(404).json({ message: 'Evento não encontrado!' });
            } 
            res.status(200).json(evento);
        } catch (error) {
            console.error('Erro ao buscar evento!');
            res.status(404).json({ message: 'Erro ao buscar evento!' });
        }
    }

    static atualizarEvento = async (req, res) => {
        const id = req.params.id;
        try {
            const evento = await Evento.findByPk(id);
            if (!evento) {
                res.status(404).json({ message: 'Evento não encontrado!' });
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