const { Op } = require('sequelize');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Interacao = require('../models/Interacao');
const { clientSchema } = require('../schemas/ClientSchema');
const { db } = require('../config/db');

// Lista clientes com próxima interação hoje
const clientes = async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const [clientes, produtos] = await Promise.all([
      Cliente.findAll({ where: { prox_interacao: hoje } }),
      Produto.findAll()
    ]);

    res.render('client', { clientes, produtos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar clientes');
  }
};

// Cria um novo cliente
const createCliente = async (req, res) => {
  try {
    req.body.criacao = new Date();
    const { error, value } = clientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: 'Dados inválidos', details: error.details });
    }

    await Cliente.create(value);
    res.status(201).json({ msg: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao salvar cliente' });
  }
};

// Busca clientes pelo nome
const procurarClientes = async (req, res) => {
  try {
    const { nome_procurar } = req.body;

    const clientes = await Cliente.findAll({
      where: {
        nome: { [Op.like]: `%${nome_procurar}%` }
      }
    });

    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao procurar clientes' });
  }
};

// Deleta cliente, ainda nao implementado
const deleteCliente = async (req, res) => {
  try {
    await Cliente.destroy({ where: { idcliente: req.params.id } });
    res.status(200).json({ msg: 'Cliente removido com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao remover cliente' });
  }
};

// Detalhes de um cliente
const detalhesClientes = async (req, res) => {
  try {
    const cliente = await Cliente.findOne({
      where: { idcliente: req.params.id }
    });

    if (!cliente) {
      return res.status(404).json({ msg: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao buscar detalhes do cliente' });
  }
};

// Atualiza dados do cliente
const updateCliente = async (req, res) => {
  try {
    const { error, value } = clientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: 'Dados inválidos', details: error.details });
    }

    await Cliente.update(value, {
      where: { idcliente: req.params.id }
    });

    res.status(200).json({ msg: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao atualizar cliente' });
  }
};

// Histórico de interações do cliente
const interacoesCliente = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).send('Cliente não encontrado');
    }

    const [interacoes] = await db.query(`
      SELECT i.descricao, i.data
      FROM interacao i
      INNER JOIN cliente c ON i.cliente_idcliente = c.idcliente
      WHERE c.idcliente = ${id}
    `);

    res.render('interacoes', {
      cliente,
      historico: interacoes.reverse()
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar interações do cliente');
  }
};

// Insere nova interação
const insertInteracao = async (req, res) => {
  try {
    const { descricao, prox_interacao } = req.body;
    const clienteId = req.params.id;

    await Interacao.create({
      cliente_idcliente: clienteId,
      data: new Date(),
      descricao,
      usuario_idusuario: req.userId
    });

    await Cliente.update(
      { prox_interacao },
      { where: { idcliente: clienteId } }
    );

    res.redirect('/clientes');
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Falha ao inserir interação' });
  }
};

module.exports = {
  clientes,
  createCliente,
  procurarClientes,
  deleteCliente,
  detalhesClientes,
  updateCliente,
  interacoesCliente,
  insertInteracao
};
