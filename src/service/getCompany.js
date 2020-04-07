const { app, db } = require('./app')

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

function getAllCompany() {
  app.get('/allCompanyPage', (req, res) => {
    const city = req.query.city
    const pageSize = req.query.pageSize || 24
    const pageNo = req.query.pageNum || 1
    const sql = `SELECT * from company WHERE city="${city}" limit ${(pageNo - 1) * pageSize}, ${pageSize}`
    db.query(sql, (err, result) => {
      const countSql = `SELECT COUNT(*) as count FROM company WHERE city="${city}"`
      db.query(countSql, (error, countResult) => {
        const data = JSON.parse(JSON.stringify(result))
        const { count } = JSON.parse(JSON.stringify(countResult))[0]
        res.send({data, count})
      })
    })
  })
}

module.exports = {
  getCompany,
  getAllCompany
}
