const Convidado = require('../models/Convidado');

class ConvidadoController {
    static cadastrarConvidado = async (req, res) => {
        const { nome, telefone, id_evento } = req.body;

        try {
            await Convidado.create({
                nome,
                telefone,
                id_evento
            });
            res.status(201).json({ message: 'Convidado criado com sucesso!' });

        } catch (error) {
            console.error('Erro ao criar Convidado: ', error);
            res.status(500).json({ message: 'Erro ao criar Convidado!' });
        }
    }

    static listarConvidados = async (req, res) => {
        try {
            const Convidados = await Convidado.findAll();
            res.status(201).json(Convidados);

        } catch (error) {
            console.error('Erro ao buscar Convidados: ', error);
            res.status(404).json({ message: 'Erro ao buscar Convidados!' });
        }
    }

    static listarConvidadoPorId = async (req, res) => {
        const id = req.params.id;
        try {
            const Convidado = await Convidado.findByPk(id);
            if (Convidado) {
                res.status(200).json(Convidado);
            } else {
                res.status(404).json({ message: 'Convidado não encontrado!' });
            }
        } catch (error) {
            console.error('Erro ao buscar Convidado!');
            res.status(404).json({ message: 'Erro ao buscar Convidado!' });
        }
    }

    static atualizarConvidado = async (req, res) => {
        const id = req.params.id;
        const { nome, descricao, dataHoraFinal, dataHoraInicial, id_evento } = req.body;

        try {
            const Convidado = await Convidado.findByPk(id);
            if (Convidado) {
                await Convidado.update({ nome, descricao, dataHoraFinal, dataHoraInicial, id_evento });
                res.status(200).json({ message: 'Convidado atualizado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Convidado não encontrado!' });
            }
        } catch (error) {
            console.error('Erro ao atualizar Convidado: ', error);
            res.status(500).json({ message: 'Erro ao atualizar Convidado!' });
        }

    }

    static deletarConvidado = async (req, res) => {
        const id = req.params.id;

        try {
            await Convidado.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({ message: 'Convidado deletado com sucesso!' });

        } catch (error) {
            console.error('Erro ao deletar Convidado: ', error);
            res.status(500).json({ message: 'Erro ao deletar Convidado!' });
        }
    }

}

module.exports = ConvidadoController;