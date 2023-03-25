const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const pathDatabase = path.resolve(__dirname, 'database.db')
const db = new sqlite3.Database(pathDatabase)

const ALUNOS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS "ALUNOS" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT,
        "nome"     varchar(50),
        "cpf"      varchar(11),
        "endereco" varchar(50),
        "estado"   varchar (10),
        "telefone" varchar(11),
        "email"    varchar(30),
        "plano"    varchar(10)
    )`
const SOBRE_SCHEMA = `
    CREATE TABLE IF NOT EXISTS "SOBRE" (
        "sobreId" INTEGER PRIMARY KEY AUTOINCREMENT,
        "comment"     varchar(100)
    )`
const FUNCIONALIDADES_SCHEMA = `
    CREATE TABLE IF NOT EXISTS "FUNCIONALIDADES" (
        "funcionalidadeId" INTEGER PRIMARY KEY AUTOINCREMENT,
        "name"     varchar(20),
        "comment"      varchar(100)
    )`
const USER_SCHEMA = `
    CREATE TABLE IF NOT EXISTS "USER" (
        "userId" INTEGER PRIMARY KEY AUTOINCREMENT,
        "firstName"     varchar(50),
        "lastName"      varchar(11),
        "email" varchar(25),
        "number"   varchar (13)
    )`

function criaTabela() {
    db.run(ALUNOS_SCHEMA, SOBRE_SCHEMA, FUNCIONALIDADES_SCHEMA, USER_SCHEMA, (error) => {
        if (error) console.log('Erro ao criar a tabela ALUNOS.')
    })
}

db.serialize(() => {
    criaTabela()
})
