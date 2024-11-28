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
            const { id_evento } = req.params; // Pega o id_evento da rota
            const tarefas = await ProgramacaoEvento.findAll({
                where: { id_evento }, // Filtra pelo id_evento
                order: [['horario', 'ASC']], // Ordena as tarefas por horário
            });
    
            if (!tarefas || tarefas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este evento.' });
            }
    
            res.status(200).json(tarefas);
        } catch (error) {
            console.error('Erro ao buscar tarefas: ', error);
            res.status(500).json({ message: 'Erro ao buscar tarefas!' });
        }
    };

    static listarTarefasEvento = async (req, res) => {
        try {
            const tarefas = await ProgramacaoEvento.findAll({
                where: {
                    id_evento: req.params.id_evento,
                }
            });
            
            if (!tarefas || tarefas.length === 0) {
                return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este evento!' });
            }
            
            res.status(200).json(tarefas);
        } catch (error) {
            console.error('Erro ao buscar tarefas: ', error);
            res.status(500).json({ message: 'Erro interno ao buscar tarefas!' });
        }
    }
    

}

module.exports = ProgramacaoController;