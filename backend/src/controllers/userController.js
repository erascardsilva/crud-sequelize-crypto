const User = require("../models/user");
const { NumberWhats, CheckEmail } = require("../services/regras");
const {
  BscryptGenerate,
  BscryptCompare,
  generateToken,
} = require("../services/jwtService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Usuario não existe" });
    }

    const passwordHashStored = user.password;

    const passwordHashLogin = await BscryptCompare(
      password,
      passwordHashStored
    );
    
     // Verifica se a variavel é true ou false
    if (!passwordHashLogin) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return res.status(200).json({
      message: "Login bem-sucedido",
      user: { id: user.id, email: user.email, hash: user.password },
      token
     
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, whatsapp, password } = req.body;
    const emailexist = await User.findOne({ where: { email } });

    // Valida o número do WhatsApp e o email
    NumberWhats(whatsapp);
    CheckEmail(emailexist);

    // Valida o tipo da senha
    if (typeof password !== "string" || Array.isArray(password)) {
      return res
        .status(400)
        .json({ error: "A senha deve ser uma string válida" });
    }

    // Criptografa a senha bcrypt
    const passwordHash = await BscryptGenerate(password);

    // Cria o usuário no banco de dados
    const user = await User.create({
      name,
      email,
      whatsapp,
      password: passwordHash,
    });

    // Retorna o usuário criado
    res.status(201).json(user);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter os usuários" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter o usuário" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, whatsapp, password } = req.body;
    const { id } = req.params;

    NumberWhats(whatsapp);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const updatedUser = await user.update({ name, email, whatsapp, password });

    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao atualizar o usuário", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário nao encontrado" });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar o usuário" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
