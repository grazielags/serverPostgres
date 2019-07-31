const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: 'postgres',
    port: 5433,
})

const getProdutos = (request, response) => {
    pool.query('SELECT * FROM produto ORDER BY nome ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getProdutoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM produto WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteProdutoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM produto WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({ id: id })
    })
}

const createProduto = (request, response) => {
    const { nome, descricao, quantidade } = request.body

    pool.query(`INSERT INTO produto (id, nome, descricao, quantidade) VALUES ((SELECT nextval('produto_seq')), $1, $2, $3)`, [nome, descricao, quantidade], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Produto adicionado!`)
    })
}

const updateProduto = (request, response) => {
    const { id, nome, descricao, quantidade } = request.body

    pool.query(`UPDATE produto SET nome = $2, descricao = $3, quantidade = $4 WHERE id = $1`, [id, nome, descricao, quantidade], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Produto alterado!`)
    })
}

module.exports = {
    getProdutos,
    getProdutoById,
    createProduto,
    updateProduto,
    deleteProdutoById,
}