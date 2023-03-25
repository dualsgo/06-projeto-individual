module.exports = class SobreDAO {
    constructor(db) {
        this.db = db;
    }

    getAllSobre() {
        const tab = 'SELECT * FROM SOBRE'
        return new Promise((resolve, reject) => {
            this.db.all(tab, (error, rows) => {
                if (error) {
                    reject({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "sobre": rows,
                        "count": rows.length,
                        "error": false
                    })
                }
            })
        })
    }

    postSobre(newSobre) {
        const tab = 'INSERT INTO SOBRE (comment) VALUE (?)'
        const post = [newSobre.comment]

        return new Promise((resolve, reject) => {
            this.db.run(tab, post, (error) => {
                if (error) {
                    reject({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve({
                        "req": newSobre,
                        "error": false
                    })
                }
            })
        })
    }

    getIdSobre(sobreId) {
        const tab = `SELECT * FROM SOBRE WHERE SOBREID = ?`
        return new Promise((resolve, reject) => {
            this.db.all(tab, sobreId, (error, rows) => {
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

    async updateSobre(sobreId, newSobre) {
        try {
            const tab = `UPDATE SOBRE SET comment = (?) where sobreId = (?)`
            const update = [newSobre.comment, sobreId]
            return new Promise((resolve, reject) => {
                this.db.run(tab, update, (error) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve({
                            "msg": `O conteúdo com sobreId ${sobreId} foi atualizado`,
                            "student": newSobre,
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

    async deleteSobre(sobreId) {
        try {
            const sobre = await this.getIdSobre(sobreId)
            if (sobre.req.length) {
                const tab = `DELETE FROM SOBRE WHERE SOBREID = ?`

                return new Promise((resolve, reject) => {
                    this.db.run(tab, sobreId, (error) => {
                        if (error) {
                            reject(error.message)
                        } else {
                            resolve({
                                "msg": `O conteúdo com sobreId ${sobreId} foi deletado`,
                                "error": false
                            })
                        }
                    })
                })
            } else {
                throw new Error(`Aluno com sobreId ${sobreId} não existe`)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
} 
