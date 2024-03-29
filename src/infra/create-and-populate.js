const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const pathDatabase = path.resolve(__dirname, 'database.db')
const db = new sqlite3.Database(pathDatabase)

const ALUNOS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS "ALUNOS" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "nome"     varchar(50),
        "cpf"      varchar(11),
        "telefone" varchar(11),
        "email"    varchar(30)
    )`

    function criaTabela() {
    db.run(ALUNOS_SCHEMA,(error) => {
        if(error) console.log('Erro ao criar a tabela alunos.')
    })
}

db.serialize( () => {
   criaTabela()
})
