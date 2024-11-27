const ProgramacaoEvento = require ('../models/ProgramacaoEvento');

class ProgramacaoController{
    static criarProgramacao = async (req, res) =>{
        try {
            const programacao = await ProgramacaoEvento.create(req.body);
            res.status(201).json({ message: "Tarefa criada com sucesso!", programacao });
        } catch (error) {
            console.error("erro ao criar tarefa: " +error)
            res.status(500).json({ error: error.message });
        }        
    }

    static listarTarefas = async (req, res) => {
        try {
            const tarefas = await ProgramacaoEvento.findAll();
            res.status(201).json(tarefas);
        } catch (error) {
            console.error('Erro ao buscar tarefas: ', error);
            res.status(404).json({ message: 'Erro ao buscar tarefas!' });
        }
    }

}

module.exports = ProgramacaoController;