const EstimativaGastos = require('../models/EstimativaGastos');
const Categoria = require('../models/Categoria');

const EstimativaController = {
    // EstimativaGastos Handlers
    async createEstimativaGastos(req, res) {
        try {
            const { nome_item, valor_item, quantidade_item, id_evento, id_categoria } = req.body;
            const estimativaGasto = await EstimativaGastos.create({
                nome_item,
                valor_item,
                quantidade_item,
                id_evento,
                id_categoria
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getEstimativaByEvento(req, res) {
        try {
            const { id_evento } = req.params;
            const estimativaGasto = await EstimativaGastos.findAll({
                where: { id_evento },
                attributes: ['nome_item', 'quantidade_item', 'valor_item', 'id_categoria'],
            });
    
            if (!estimativaGasto || estimativaGasto.length === 0) {
                return res.status(404).json({ message: 'Estimativa não encontrada para a categoria fornecida' });
            }
    
            // Buscar o nome da categoria para cada item em estimativaGasto
            const result = await Promise.all(estimativaGasto.map(async (item) => {
                const categoria = await Categoria.findByPk(item.id_categoria, {
                    attributes: ['nome']
                });
    
                return {
                    nome_item: item.nome_item,
                    quantidade_item: item.quantidade_item,
                    valor_item: item.valor_item,
                    categoria_nome: categoria ? categoria.nome : 'Categoria não encontrada'
                };
            }));
    

            res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao buscar estimativa:", error.message);
            res.status(500).json({ error: error.message });
        }
    },
    
    
    
    
    
    
    

    async getAllEstimativaGastos(req, res) {
        try {
            const estimativaGastos = await EstimativaGastos.findAll();
            res.status(200).json(estimativaGastos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getEstimativaGastosById(req, res) {
        try {
            const { id } = req.params;
            const estimativaGasto = await EstimativaGastos.findByPk(id);
            if (!estimativaGasto) {
                return res.status(404).json({ message: 'Estimativa não encontrada' });
            }
            res.status(200).json(estimativaGasto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateEstimativaGastos(req, res) {
        try {
            const { id } = req.params;
            const { nome_item, valor_item, quantidade_item, id_evento, id_categoria } = req.body;
            const estimativaGasto = await EstimativaGastos.findByPk(id);
            if (!estimativaGasto) {
                return res.status(404).json({ message: 'Estimativa não encontrada' });
            }
            await estimativaGasto.update({
                nome_item,
                valor_item,
                quantidade_item,
                id_evento,
                id_categoria
            });
            res.status(200).json(estimativaGasto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteEstimativaGastos(req, res) {
        try {
            const { id } = req.params;
            const estimativaGasto = await EstimativaGastos.findByPk(id);
            if (!estimativaGasto) {
                return res.status(404).json({ message: 'Estimativa não encontrada' });
            }
            await estimativaGasto.destroy();
            res.status(204).json({ message: 'Estimativa deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Categoria Handlers
    async createCategoria(req, res) {
        try {
            console.log('Recebido corpo da requisição:', req.body);
    
            const { nome, id_usuario } = req.body;
    
            if (!nome || !id_usuario) {
                console.error('Dados inválidos recebidos:', req.body);
                return res.status(400).json({ error: 'Nome da categoria e ID do usuário são obrigatórios' });
            }
    
            console.log('Criando categoria com os dados:', { nome, id_usuario });
    
            const categoria = await Categoria.create({ nome, id_usuario });
    
            console.log('Categoria criada com sucesso:', categoria);
    
            res.status(201).json(categoria);
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    async getAllCategorias(req, res) {
        try {
            const categorias = await Categoria.findAll();
            const nomeCategorias = categorias.map(categoria => ({
                id: categoria.id_categoria,
                nome: categoria.nome
            }));
            res.status(200).json(nomeCategorias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getCategoriaById(req, res) {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findByPk(id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateCategoria(req, res) {
        try {
            const { id } = req.params;
            const { nome, id_usuario } = req.body;
            const categoria = await Categoria.findByPk(id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            await categoria.update({ nome, id_usuario });
            res.status(200).json(categoria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteCategoria(req, res) {
        try {
            const { id } = req.params;
            const categoria = await Categoria.findByPk(id);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada' });
            }
            await categoria.destroy();
            res.status(204).json({ message: 'Categoria deletada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = EstimativaController;
