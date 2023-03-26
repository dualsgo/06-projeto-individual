module.exports = class AlunosDAO {
    constructor(db) {
        this.db = db;
    }

    getAllAlunos() {
        const tab = 'SELECT * FROM ALUNOS'
        return new Promise((resolve, reject) => {
            this.db.all(tab, (error, rows) => {
                if (error) {
                    reject({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "alunos": rows,
                        "count": rows.length,
                        "error": false
                    })
                }
            })
        })
    }

    postAlunos(newAluno) {
        const tab = 'INSERT INTO ALUNOS (nome, cpf,telefone, email ) VALUES (?,?,?,?)'
        const post = [newAluno.nome, newAluno.cpf, newAluno.telefone, newAluno.email]

        return new Promise((resolve, reject) => {
            this.db.run(tab, post, (error) => {
                if (error) {
                    reject({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "req": newAluno,
                        "error": false
                    })
                }
            })
        })
    }

    getIdAlunos(id) {
        const tab = `SELECT * FROM ALUNOS WHERE ID = ?`
        return new Promise((resolve, reject) => {
            this.db.all(tab, id, (error, rows) => {
                if (error) {
                    reject({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "req": rows,
                        "error": false
                    })
                }
            })
        })
    }

    async updateAlunos(id, newAluno) {
        try {
            const tab = `UPDATE ALUNOS SET nome = (?), cpf = (?), telefone = (?), email = (?) id  = (?) where id = (?)`
            const update = [newAluno.nome, newAluno.cpf, newAluno.telefone, newAluno.email, id]
            return new Promise((resolve, reject) => {
                this.db.run(tab, update, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "msg": `O aluno com id ${id} foi atualizado`,
                            "student": newAluno,
                            "error": false
                        })
                    }
                })
            })
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteAlunos(id) {
        try {
            const alunos = await this.getIdAlunos(id)
            if (alunos.req.length) {
                const tab = `DELETE FROM ALUNOS WHERE ID = ?`

                return new Promise((resolve, reject) => {
                    this.db.run(tab, id, (error) => {
                        if (error) {
                            reject(error.message)
                        } else {
                            resolve({
                                "msg": `O aluno com id ${id} foi deletado`,
                                "error": false
                            })
                        }
                    })
                })
            } else {
                throw new Error(`Aluno com id ${id} não existe`)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
} 
