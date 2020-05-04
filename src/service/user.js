const { app, db } = require('./app')
const { SUCCESS_CODE, ERR_CODE } = require('./SERVE_SEM')

function registry() {
  app.post('/registry', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { username, password, type } = JSON.parse(params)
      const querySql = `SELECT * from user WHERE username="${username}"`
      db.query(querySql, (err, result) => {
        const userList = JSON.parse(JSON.stringify(result))
        if (!userList.length) {
          const insertSql = `INSERT INTO user (username, password, type) VALUES ("${username}", "${password}", "${type}")`
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
            db.query(`SELECT jobId from delivery WHERE userId=${user.id}`, (error, sqlRes) => {
              if(error) throw error
              user.deliveryList = JSON.parse(JSON.stringify(sqlRes)).map(v => v.jobId)
              res.send({
                data: user,
                code: SUCCESS_CODE,
                msg: '登录成功!'
              })
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

function updateUserCompany() {
  app.post('/updateCompany', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const {companyId, id} = JSON.parse(params)
      const sql = 'UPDATE user SET companyId=? WHERE id=?'
      const paramsArr = [companyId, id]
      db.query(sql, paramsArr,(err) => {
        if(err) throw err
        res.send({ code: SUCCESS_CODE })
      })
    })
  })
}

function getAllUser() {
  app.get('/getAllUser', (req, res) => {
    const sql = `SELECT * from user WHERE type=1 OR type=0`
    db.query(sql, (err, result) => {
      const data = JSON.parse(JSON.stringify(result))
      res.send({data})
    })
  })
}

function delUser() {
  app.post('/delUser', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const {id} = JSON.parse(params)
      const sql = `DELETE FROM user WHERE id=${id}`
      db.query(sql, err => {
        if(err) throw err
        res.send({
          code: SUCCESS_CODE, msg: '删除成功!'
        })
      })
    })
  })
}

function editUser() {
  app.post('/editUser', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { id, username, password, type } = JSON.parse(params)
      const sql = `UPDATE user SET username=?, password=?, type=? WHERE id=?`
      const arr = [`${username}`, `${password}`, `${type}`, id]
      db.query(sql, arr,err => {
        if(err) throw err
        res.send({
          code: SUCCESS_CODE, msg: '删除成功!'
        })
      })
    })
  })
}


module.exports = {
  registry,
  login,
  updateUserCompany,
  getAllUser,
  delUser,
  editUser
}
