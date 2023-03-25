const userDAO = require('../DAO/user-DAO')
const User = require('../model/user-model')

const expUser = (app, db) => {
    const userDB = new userDAO(db)

    app.get('/user', async (req, res) => {
        try {
            const resposta = await userDB.getAllUser()
            res.json(resposta)
        }
        catch (error) {
            res.json(error)
        }
    })

    app.post('/user', async (req, res) => {
        try {
            const body = req.body
            const newUser = new User(body.firstName, body.lastName, body.email, body.number)

            const resp = await userDB.postUser(newUser)
            res.json(resp)
        }
        catch (error) {
            res.json({
                "msg": error.message,
                "error": true
            })
        }
    })

    app.get('/user/:userId', async (req, res) => {
        const userId = req.params.userId
        try {
            const resposta = await userDB.getIdUser(userId)
            res.json(resposta)
        }
        catch (error) {
            res.status(404).json(error)
        }
    })

    app.put('/user/:userId', async (req, res) => {
        const userId = req.params.userId
        const body = req.body

        try {
            const get = await userDB.getIdUser(userId)
            const update = get.req[0]

            if (update) {
                const updatedUser = new User(body.firstName || update.firstName, body.lastName || update.lastName, body.email || update.email, body.number || update.number)

                const resposta = await userDB.updateUser(userId, updatedUser)
                res.json(resposta)

            } else {
                res.json({
                    "msg": `User com userId ${userId} não existe`,
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

    app.delete('/user/:userId', async (req, res) => {
        const userId = parseInt(req.params.userId)
        try {
            const resposta = await userDB.deleteUser(userId)
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

module.exports = expUser