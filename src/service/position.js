const { app, db } = require('./app')

function getPosition() {
  app.get('/positionPage', (req, res) => {
    const type = req.query.type
    const pageSize = req.query.pageSize || 9
    const pageNo = req.query.pageNum || 1
    const sql = `SELECT * from job WHERE type like '%${type}%' order by rand() limit ${(pageNo - 1) * pageSize}, ${pageSize}`
    db.query(sql, (err, result) => {
      const data = JSON.parse(JSON.stringify(result))
      res.send(data)
    })
  })
}

function getAllPosition() {
  app.get('/allPositionPage', (req, res) => {
    const city = req.query.city
    const pageSize = req.query.pageSize || 10
    const pageNo = req.query.pageNum || 1
    const sql = `SELECT * from job WHERE city="${city}" limit ${(pageNo - 1) * pageSize}, ${pageSize}`
    db.query(sql, (err, result) => {
      const countSql = `SELECT COUNT(*) as count FROM job WHERE city="${city}"`
      db.query(countSql, (error, countResult) => {
        const data = JSON.parse(JSON.stringify(result))
        const { count } = JSON.parse(JSON.stringify(countResult))[0]
        res.send({data, count})
      })
    })
  })
}

module.exports = {
  getPosition,
  getAllPosition
}
