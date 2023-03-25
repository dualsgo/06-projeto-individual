module.exports = class FuncionalidadesDAO {
    constructor(db) {
        this.db = db;
    }

    getAllFuncionalidades() {
        const tab = 'SELECT * FROM FUNCIONALIDADES'
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

    postFuncionalidades(newAluno) {
        const tab = 'INSERT INTO FUNCIONALIDADES (name, comment) VALUES (?,?)'
        const post = [newAluno.name, newAluno.comment]

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

    getIdFuncionalidades(funcionalidadesId) {
        const tab = `SELECT * FROM FUNCIONALIDADES WHERE FUNCIONALIDADESID = ?`
        return new Promise((resolve, reject) => {
            this.db.all(tab, funcionalidadesId, (error, rows) => {
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

    async updateFuncionalidades(funcionalidadesId, newAluno) {
        try {
            const tab = `UPDATE FUNCIONALIDADES SET name = (?), comment = (?) where funcionalidadesId = (?)`
            const update = [newAluno.name, newAluno.comment, funcionalidadesId]
            return new Promise((resolve, reject) => {
                this.db.run(tab, update, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "msg": `A funcionalidade com funcionalidadesId ${funcionalidadesId} foi atualizado`,
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

    async deleteFuncionalidades(funcionalidadesId) {
        try {
            const alunos = await this.getIdFuncionalidades(funcionalidadesId)
            if (alunos.req.length) {
                const tab = `DELETE FROM FUNCIONALIDADES WHERE FUNCIONALIDADESID = ?`

                return new Promise((resolve, reject) => {
                    this.db.run(tab, funcionalidadesId, (error) => {
                        if (error) {
                            reject(error.message)
                        } else {
                            resolve({
                                "msg": `A funcionalidade com funcionalidadesId ${funcionalidadesId} foi deletado`,
                                "error": false
                            })
                        }
                    })
                })
            } else {
                throw new Error(`Funcionalidade com funcionalidadesId ${funcionalidadesId} não existe`)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
} 
