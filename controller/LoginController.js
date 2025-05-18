const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
require('dotenv').config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email e senha são obrigatórios' });
    }

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      // Mensagem genérica por segurança
      const msg = 'Usuário não cadastrado'
      res.redirect(`/?err=${msg}`)
    }

    const senhaValida = await bcrypt.compare(password, user.senha);
    if (!senhaValida) {
      const msg = 'Senha inválida'
      res.redirect(`/?err=${msg}`)
    }

    const token = jwt.sign(
      { id: user.idusuario },
      process.env.SECRET_KEY,
      { expiresIn: '5h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 5 * 60 * 60 * 1000 // 5h
    });

    res.redirect('/clientes');

  } catch (error) {
    console.error('Erro no login:', error);
    const msg = 'Erro ao realizar login'
    res.redirect(`/?err=${msg}`)
  }
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = {
  login,
  logout
};
