const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')

const alunos = require('./src/controller/alunos-controller')
const sobre = require('./src/controller/sobre-controller')
const funcionalidades = require('./src/controller/funcionalidades-controller')
const user = require('./src/controller/user-controller')

const db = require('./src/infra/banco')

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  console.log('Middleware OK')
  next()
})

alunos(app, db)
sobre(app, db)
funcionalidades(app, db)
user(app, db)


app.listen(PORT, () => {
  console.log("Servidor: http://localhost:3000");
})