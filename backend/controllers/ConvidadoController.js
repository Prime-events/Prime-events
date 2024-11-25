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

    static listarConvidadoPorIdEvento = async (req, res) => {
        try {
            const convidado = await Convidado.findAll({
                where: {
                    id_evento: req.params.id_evento
                },
            });
            if (!convidado) {
                return res.status(404).json({ message: 'Convidado não encontrado!' });
            }
            res.status(200).json(convidado);
        } catch (error) {
            console.error('Erro ao buscar convidado!');
            res.status(404).json({ message: 'Erro ao buscar convidado!' });
        }
    }

    static atualizarConvidado = async (req, res) => {
        const { nome, telefone, presenca, id_evento } = req.body;

        try {
            const convidado = await Convidado.findByPk(req.params.id);

            if (!convidado) {
                return res.status(404).json({ message: 'Convidado não encontrado!' });
            }
            const dados = {};
            if (nome !== undefined) dados.nome = nome;
            if (telefone !== undefined) dados.telefone = telefone;
            if (presenca !== undefined) dados.presenca = presenca;
            if (id_evento !== undefined) dados.id_evento = id_evento;

            await convidado.update(dados);
            res.status(200).json({ message: 'Convidado atualizado com sucesso!' });
            
        } catch (error) {
            console.error('Erro ao atualizar Convidado: ', error);
            res.status(500).json({ message: 'Erro ao atualizar Convidado!' });
        }

    }

    static deletarConvidado = async (req, res) => {
        try {
            await Convidado.destroy({
                where: {
                    id: req.params.id
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