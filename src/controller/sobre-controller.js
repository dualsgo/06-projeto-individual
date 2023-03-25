const sobreDAO = require('../DAO/sobre-DAO')
const Sobre = require('../model/sobre-model')

const expSobre = (app, db) => {
    const sobreDB = new sobreDAO(db)

    app.get('/sobre', async (req, res) => {
        try {
            const resposta = await sobreDB.getAllSobre()
            res.json(resposta)
        }
        catch (error) {
            res.json(error)
        }
    })

    app.post('/sobre', async (req, res) => {
        try {
            const body = req.body
            const newSobre = new Sobre(body.comment)

            const resp = await sobreDB.postSobre(newSobre)
            res.json(resp)
        }
        catch (error) {
            res.json({
                "msg": error.message,
                "error": true
            })
        }
    })

    app.get('/sobre/:sobreId', async (req, res) => {
        const sobreId = req.params.sobreId
        try {
            const resposta = await sobreDB.getIdSobre(sobreId)
            res.json(resposta)
        }
        catch (error) {
            res.status(404).json(error)
        }
    })

    app.put('/sobre/:sobreId', async (req, res) => {
        const sobreId = req.params.sobreId
        const body = req.body

        try {
            const get = await sobreDB.getIdSobre(sobreId)
            const update = get.req[0]

            if (update) {
                const updatedSobre = new Sobre(body.comment || update.comment)

                const resposta = await sobreDB.updateSobre(sobreId, updatedSobre)
                res.json(resposta)

            } else {
                res.json({
                    "msg": `Sobre com sobreId ${sobreId} não existe`,
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

    app.delete('/sobre/:sobreId', async (req, res) => {
        const sobreId = parseInt(req.params.sobreId)
        try {
            const resposta = await sobreDB.deleteSobre(sobreId)
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

module.exports = expSobre