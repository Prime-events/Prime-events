const usuarioModel = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static CreateUser = async (req, res) => {
        const { nome, sobrenome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        // Passando a senha para Hash
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        const coresPerfil = ['#985ee1', '#2495e1', '#e67e22', '#f1c40f', '#e74c3c'];

        const escolherCorAleatoria = () => {
            const indiceAleatorio = Math.floor(Math.random() * coresPerfil.length);
            return coresPerfil[indiceAleatorio];
        };

        try {
            const user = await usuarioModel.findOne({ where: { email: email } });
            if (user) {
                return res.status(400).json({ message: 'O Email já está em uso!' });
            }

            const novaCor = escolherCorAleatoria();


            const novoUsuario = await usuarioModel.create({ nome, sobrenome, email, senha: senhaHash, corPerfil: novaCor });
            return res.status(200).json({ message: 'Usuário criado com sucesso!', id: novoUsuario.id, corPerfil: novoUsuario.corPerfil });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }

    static LoginUser = async (req, res) => {
        const { email, senha } = req.body;
        console.log(email + ", " + senha);
        if (!email || !senha) {
            return res.status(423).send('Todos os campos são obrigatórios.');
        }

        const user = await usuarioModel.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
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

    static getUser = async (req, res) => {
        const { email } = req.params; // Desestruturação para pegar o email do body 
        try {
            const userDados = await usuarioModel.findOne({
                where: { email: email }
            }); // Verifica se encontrou o usuário 
            if (!userDados) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            } // Se encontrou, retorna os dados selecionados 
            const userInfo = {
                id_usuario: userDados.id_usuario,
                nome: userDados.nome,
                sobrenome: userDados.sobrenome,
                email: userDados.email,
                corPerfil: userDados.corPerfil,
            };
            res.status(200).json(userInfo);
        }
        catch (error) {
            console.error("Erro ao buscar usuário:", error);
            res.status(500).json({
                message: "Erro interno no servidor",
                error: error.message
            });
        }
    }

    static updateUser = async (req, res) => {
        const { email } = req.params;
        const { nome, sobrenome, novaSenha } = req.body; // Assumindo que esses são os campos que você deseja atualizar

        try {
            const userDados = await usuarioModel.findOne({
                where: { email: email }
            });

            if (!userDados) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            // Atualiza os campos necessários
            userDados.nome = nome || userDados.nome;
            userDados.sobrenome = sobrenome || userDados.sobrenome;

            if (novaSenha) {
                const salt = await bcrypt.genSalt(12);
                userDados.senha = await bcrypt.hash(novaSenha, salt);
            }

            await userDados.save(); // Salva as alterações

            // Retorna os dados atualizados
            const userInfo = {
                id_usuario: userDados.id_usuario,
                nome: userDados.nome,
                sobrenome: userDados.sobrenome,
                email: userDados.email,
            };

            res.status(200).json(userInfo);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            res.status(500).json({
                message: "Erro interno no servidor",
                error: error.message
            });
        }
    }

    static updateEmail = async (req, res) => {
        const { email } = req.params;
        const { currentPassword, newEmail } = req.body;
        try {
            const userDados = await usuarioModel.findOne({
                where: { email: email }
            });
            if (!userDados) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            const verificaSenha = await bcrypt.compare(currentPassword, userDados.senha);
            if (!verificaSenha) {
                console.log("verificação de senha atual para trocar email deu inválida.");
                return res.status(422).json({ message: 'Senha inválida!' });
            }

            userDados.email = newEmail || userDados.email

            await userDados.save(); // Salva as alterações

            // Retorna os dados atualizados
            const userInfo = {
                email: userDados.email,
            };

            res.status(200).json(userInfo);

        } catch (error) {
            console.error("Erro ao atualizar email:", error);
            res.status(500).json({
                message: "Erro interno no servidor",
                error: error.message
            });
        }
    }

    static updateSenha = async (req, res) => {
        const { email } = req.params;
        const { currentPasswordChange, newPassword, confirmPassword } = req.body;

        try {
            const userDados = await usuarioModel.findOne({ where: { email: email } });
            if (!userDados) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            const verificaSenha = await bcrypt.compare(currentPasswordChange, userDados.senha);
            console.log('Senha verificada:', verificaSenha);

            if (!verificaSenha) {
                return res.status(422).json({ message: 'Senha inválida!' });
            }

            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(newPassword, salt);

            userDados.senha = senhaHash;

            await userDados.save();

            res.status(200).json({ message: "Senha atualizada com sucesso!" });

        } catch (error) {
            console.error("Erro ao atualizar senha:", error);
            res.status(500).json({
                message: "Erro interno no servidor",
                error: error.message
            });
        }
    }


}

module.exports = UserController;

