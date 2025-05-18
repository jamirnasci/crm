const { productSchema } = require("../schemas/ProductSchema");
const Produto = require("../models/Produto");
const { Op } = require("sequelize");

const produtos = (req, res) => {
  res.render("products");
};

const insertProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: "Dados inválidos", error: error.details });
    }

    await Produto.create(value);
    res.status(201).json({ msg: "Produto cadastrado com sucesso!" });

  } catch (err) {
    console.error("Erro ao salvar produto:", err);
    res.status(500).json({ msg: "Erro interno ao salvar produto" });
  }
};

const procurarProduto = async (req, res) => {
  try {
    const { produto_procurar } = req.body;

    const produtos = await Produto.findAll({
      where: {
        nome: {
          [Op.like]: `%${produto_procurar}%`
        }
      }
    });

    res.json(produtos);

  } catch (err) {
    console.error("Erro na busca de produtos:", err);
    res.status(500).json({ msg: "Erro interno ao procurar produto" });
  }
};

const detalhesProduto = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    res.json(produto);

  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({ msg: "Erro interno ao buscar produto" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: "Dados inválidos", error: error.details });
    }

    const [updated] = await Produto.update(value, {
      where: { idproduto: req.params.id }
    });

    if (updated === 0) {
      return res.status(404).json({ msg: "Produto não encontrado para atualização" });
    }

    res.status(200).json({ msg: "Produto atualizado com sucesso!" });

  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ msg: "Erro interno ao atualizar produto" });
  }
};

module.exports = {
  produtos,
  insertProduct,
  procurarProduto,
  detalhesProduto,
  updateProduct
};
