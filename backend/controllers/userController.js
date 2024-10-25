const usuarioModel = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static CreateUser = async (req, res) => {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Passando a senha para Hash
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        try {
            const user = await usuarioModel.findOne({ where: { email: email } });
            if (user) {
                return res.status(400).json({ message: 'O Email já está em uso!' });
            }
            const novoUsuario = await usuarioModel.create({ nome, email, senha: senhaHash });
            return res.status(200).json({ message: 'Usuário criado com sucesso!', id: novoUsuario.id });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }

    static LoginUser = async (req, res) => {
        const { email, senha } = req.body;
        console.log(email+", " + senha);
        if (!email || !senha) {
            return res.status(422).send('Todos os campos são obrigatórios.');
        }

        const user = await usuarioModel.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado!' });
        }
 
        // Verifica se as senhas coincidem
        const verificaSenha = await bcrypt.compare(senha, user.senha);
        if (!verificaSenha) {
            return res.status(422).json({ message: 'Senha inválida!' });
        }

        try {
            const secret = process.env.SECRET;
            const token = jwt.sign({ id: user.id }, secret);
            return res.status(200).json({ message: 'Autenticação realizada com sucesso!', token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Aconteceu um erro no servidor, tente novamente mais tarde!' });
        }
    }

    static checkToken = async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Acesso negado!' });
        }

        try {
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        } catch (error) {
            return res.status(400).json({ message: 'Token inválido!' });
        }
    }
}

module.exports = UserController;
