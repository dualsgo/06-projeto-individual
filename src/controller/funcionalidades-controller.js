const funcionalidadesDAO = require('../DAO/funcionalidades-DAO')
const Funcionalidades = require('../model/funcionalidades-model')

const expFuncionalidades = (app, db) => {
    const funcionalidadesDB = new funcionalidadesDAO(db)

    app.get('/funcionalidades', async (req, res) => {
        try {
            const resposta = await funcionalidadesDB.getAllFuncionalidades()
            res.json(resposta)
        }
        catch (error) {
            res.json(error)
        }
    })

    app.post('/funcionalidades', async (req, res) => {
        try {
            const body = req.body
            const newFuncionalidade = new Funcionalidade(body.name, body.comment)

            const resp = await funcionalidadesDB.postFuncionalidades(newFuncionalidade)
            res.json(resp)
        }
        catch (error) {
            res.json({
                "msg": error.message,
                "error": true
            })
        }
    })

    app.get('/funcionalidades/:funcionalidadesId', async (req, res) => {
        const funcionalidadesId = req.params.funcionalidadesId
        try {
            const resposta = await funcionalidadesDB.getIdFuncionalidades(funcionalidadesId)
            res.json(resposta)
        }
        catch (error) {
            res.status(404).json(error)
        }
    })

    app.put('/funcionalidades/:funcionalidadesId', async (req, res) => {
        const funcionalidadesId = req.params.funcionalidadesId
        const body = req.body

        try {
            const get = await funcionalidadesDB.getIdFuncionalidades(funcionalidadesId)
            const update = get.req[0]

            if (update) {
                const updatedFuncionalidades = new Funcionalidade(body.name || update.name, body.comment || update.comment)

                const resposta = await funcionalidadesDB.updateFuncionalidades(funcionalidadesId, updatedFuncionalidades)
                res.json(resposta)

            } else {
                res.json({
                    "msg": `Funcionalidade com funcionalidadesId ${funcionalidadesId} não existe`,
                    "error": true
                })
            }
        }

        catch (error) {
            res.json({
                "msg": error.message,
                "error": true
            })
        }
    })

    app.delete('/funcionalidades/:funcionalidadesId', async (req, res) => {
        const funcionalidadesId = parseInt(req.params.funcionalidadesId)
        try {
            const resposta = await funcionalidadesDB.deleteFuncionalidades(funcionalidadesId)
            res.json(resposta)
        }
        catch (error) {
            res.status(404).json({
                "msg": error.message,
                "error": true
            })
        }
    })
}

module.exports = expFuncionalidades