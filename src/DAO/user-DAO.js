module.exports = class UserDAO {
    constructor(db) {
        this.db = db;
    }

    getAllUser(){
        const tab = 'SELECT * FROM USER'
        return new Promise ((resolve, reject) => {
            this.db.all (tab, (error, rows) => {
                if (error) {
                    reject ({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve ({
                        "alunos": rows,
                        "count": rows.length,
                        "error": false
                    })
                }
            }) 
        })
    }

    postUser(newUser) {
        const tab = 'INSERT INTO USER (firstName, lastName, email, number) VALUES (?,?,?,?)'
        const post = [newUser.firstName, newUser.lastName, newUser.email, newUser.number]
        
        return new Promise((resolve, reject)=> {
            this.db.run(tab, post, (error) => {
                if (error) {
                    reject ({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve ({
                        "req": newUser,
                        "error": false
                    })
                }
            })
        })
    }

    getIdUser(userId){
        const tab = `SELECT * FROM USER WHERE USERID = ?`
        return new Promise((resolve, reject)=> {
            this.db.all(tab, userId, (error, rows)=> {
                if (error) {
                    reject ({
                        "msg": error.message,
                        "error": true
                    })
                } else {
                    resolve ({
                        "req": rows,
                        "error": false
                    })
                }
            })
        })
    }

    async updateUser(userId, newUser) {
        try {
            const tab = `UPDATE USER SET firstName = (?), lastName = (?), email = (?), number = (?) where userId = (?)`
            const update = [newUser.firstName, newUser.lastName, newUser.email, newUser.number, userId]
            return new Promise((resolve, reject)=> {
                this.db.run(tab, update, (error)=> {
                    if (error) {
                        reject (error)
                    } else {
                        resolve ({
                            "msg": `O user com userId ${userId} foi atualizado`,
                            "student": newUser,
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

   async deleteUser(userId) {
        try {
            const alunos = await this.getIdUser(userId)
            if (alunos.req.length) {
                const tab = `DELETE FROM USER WHERE USERID = ?`

                return new Promise((resolve, reject)=> {
                    this.db.run(tab, userId, (error) => {
                        if (error) {
                            reject (error.message)  
                        } else {
                            resolve ({
                                "msg": `O user com userId ${userId} foi deletado`,
                                "error": false
                            })
                        }
                    })
                })
            } else {
                throw new Error (`User com userId ${userId} não existe`)
        }
    } catch (error) {
            throw new Error(error.message)
      }
    }
} 
