const Evento = require('../models/Evento');

class EventoController {
    static criarEvento = async (req, res) => {
        const { nome, descricao, data_hora_final, data_hora_inicial, local } = req.body;

        try {
            await Evento.create({
                nome,
                descricao,
                data_hora_final,
                data_hora_inicial,
                local
            });
            res.status(201).json({ message: 'Evento criado com sucesso!' });

        } catch (error) {
            console.error('Erro ao criar evento: ', error);
            res.status(500).json({ message: 'Erro ao criar evento!' });
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
        const id = req.params.id;
        try {
            const evento = await Evento.findByPk(id);
            if (evento) {
                res.status(200).json(evento);
            } else {
                res.status(404).json({ message: 'Evento não encontrado!' });
            }
        } catch (error) {
            console.error('Erro ao buscar evento!');
            res.status(404).json({ message: 'Erro ao buscar evento!' });
        }
    }

    static atualizarEvento = async (req, res) => {
        const id = req.params.id;
        const { nome, descricao, dataHoraFinal, dataHoraInicial, local } = req.body;

        try {
            const evento = await Evento.findByPk(id);
            if (evento) {
                await evento.update({ nome, descricao, dataHoraFinal, dataHoraInicial, local });
                res.status(200).json({ message: 'Evento atualizado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Evento não encontrado!' });
            }
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