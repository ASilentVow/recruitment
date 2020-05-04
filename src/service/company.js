const { app, db } = require('./app')
const { SUCCESS_CODE } = require('./SERVE_SEM')

function getCompany() {
  app.get('/companyPage', (req, res) => {
    const type = req.query.type
    const pageSize = req.query.pageSize || 12
    const pageNo = req.query.pageNum || 1
    const sql = `SELECT * from company WHERE type like '%${type}%' limit ${(pageNo - 1) * pageSize}, ${pageSize}`
    db.query(sql, (err, result) => {
      const data = JSON.parse(JSON.stringify(result))
      res.send(data)
    })
  })
}

function getSelectCompany() {
  app.get('/selectCompany', (req, res) => {
    const name = req.query.name
    const sql = `SELECT * from company WHERE companyName like '%${name}%'`
    db.query(sql, (err, result) => {
      const data = JSON.parse(JSON.stringify(result))
      res.send(data)
    })
  })
}

function getCompanyById() {
  app.get('/companyById', (req, res) => {
    const { companyId } = req.query
    const sql = `SELECT * from company WHERE companyId=${companyId}`
    db.query(sql, (err, result) => {
      const data = JSON.parse(JSON.stringify(result))
      res.send({
        data: data[0] || null
      })
    })
  })
}

function getAllCompany() {
  app.get('/allCompanyPage', (req, res) => {
    const city = req.query.city
    const pageSize = req.query.pageSize || 24
    const pageNo = req.query.pageNum || 1
    const sql = req.query.city ?
      `SELECT * from company WHERE city="${city}" limit ${(pageNo - 1) * pageSize}, ${pageSize}` :
      `SELECT * from company`
    db.query(sql, (err, result) => {
      const countSql = req.query.city ?
        `SELECT COUNT(*) as count FROM company WHERE city="${city}"` :
        `SELECT COUNT(*) as count FROM company`
      db.query(countSql, (error, countResult) => {
        const data = JSON.parse(JSON.stringify(result))
        const { count } = JSON.parse(JSON.stringify(countResult))[0]
        res.send({data, count})
      })
    })
  })
}

function delCompany() {
  app.post('/delCompany', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const {id} = JSON.parse(params)
      const sql = `DELETE FROM company WHERE id=${id}`
      db.query(sql, err => {
        if(err) throw err
        res.send({
          code: SUCCESS_CODE, msg: '删除成功!'
        })
      })
    })
  })
}

module.exports = {
  getCompany,
  getAllCompany,
  getCompanyById,
  getSelectCompany,
  delCompany
}
