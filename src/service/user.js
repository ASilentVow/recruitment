const { app, db } = require('./app')
const { SUCCESS_CODE, ERR_CODE } = require('./SERVE_SEM')

function registry() {
  app.post('/registry', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { username, password } = JSON.parse(params)
      const querySql = `SELECT * from user WHERE username="${username}"`
      db.query(querySql, (err, result) => {
        const userList = JSON.parse(JSON.stringify(result))
        if (!userList.length) {
          const insertSql = `INSERT INTO user (username, password) VALUES ("${username}", "${password}")`
          db.query(insertSql, (error) => {
            if (error) throw error
            res.send({
                code: SUCCESS_CODE,
                msg: '注册成功!'
            })
          })
        } else {
          res.send({
            code: ERR_CODE,
            msg: '用户名已存在!'
          })
        }
      })
    })
  })
}

function login() {
  app.post('/login', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { username, password } = JSON.parse(params)
      const sql = `SELECT * from user WHERE username="${username}"`
      db.query(sql, (err, result) => {
        const userList = JSON.parse(JSON.stringify(result))
        if (userList.length) {
          const user = userList[0]
          if (password === user.password) {
            res.send({
              data: { id: user.id, username: user.username },
              code: SUCCESS_CODE,
              msg: '登录成功!'
            })
          } else {
            res.send({
              code: ERR_CODE, msg: '密码错误!'
            })
          }
        } else {
          res.send({
            code: ERR_CODE, msg: '用户名不存在!'
          })
        }
      })
    })
  })
}

module.exports = {
  registry,
  login
}
