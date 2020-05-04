const { app, db } = require('./app')
const { SUCCESS_CODE } = require('./SERVE_SEM')

function getPosition() {
  app.get('/positionPage', (req, res) => {
    const type = req.query.type
    const pageSize = req.query.pageSize || 9
    const pageNo = req.query.pageNum || 1
    const sql = `SELECT * from job WHERE type like '%${type}%' AND isDel=1 order by rand() limit ${(pageNo - 1) * pageSize}, ${pageSize}`
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
    const sql = req.query.city ?
      `SELECT * from job WHERE city="${city}" AND isDel=1 limit ${(pageNo - 1) * pageSize}, ${pageSize}` :
      `SELECT * from job WHERE isDel=1`
    db.query(sql, (err, result) => {
      const countSql = `SELECT COUNT(*) as count FROM job WHERE city="${city}" AND isDel=1`
      db.query(countSql, (error, countResult) => {
        const data = JSON.parse(JSON.stringify(result))
        const { count } = JSON.parse(JSON.stringify(countResult))[0]
        res.send({data, count})
      })
    })
  })
}

function getPositionById() {
  app.get('/getPositionById', (req, res) => {
    const { companyId } = req.query
    const pageSize = req.query.pageSize || 10
    const pageNo = req.query.pageNum || 1
    const sql = `SELECT * from job WHERE parentId=${companyId} AND isDel=1 limit ${(pageNo - 1) * pageSize}, ${pageSize}`
    db.query(sql, (err, result) => {
      const countSql = `SELECT COUNT(*) as count FROM job WHERE parentId=${companyId} AND isDel=1`
      db.query(countSql, (error, countResult) => {
        const data = JSON.parse(JSON.stringify(result))
        const { count } = JSON.parse(JSON.stringify(countResult))[0]
        res.send({ data, count })
      })
    })
  })
}

function getPositionInfo() {
  app.get('/getPositionInfo', (req, res) => {
    const { id } = req.query
    const sql = `SELECT * from job WHERE id=${id} AND isDel=1`
    db.query(sql, (err, result) => {
      if (err) throw err
      const data = JSON.parse(JSON.stringify(result))
      res.send({ data: data[0] })
    })
  })
}

function insertPosition() {
  app.post('/insertPosition', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { jobName, education, jobSalary, jobExperience, companyId, announcer } = JSON.parse(params)
      const querySql = `SELECT * from company WHERE companyId=${companyId}`
      db.query(querySql, (err, result) => {
        const {companyName, type, peopleNum, slogan, city, situation} = JSON.parse(JSON.stringify(result))[0]
        const addSql = 'INSERT INTO job(parentId,jobName,jobExperience,education,' +
          'jobSalary,announcer,companyName,type,peopleNum,slogan,city,situation,isDel) ' +
          'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,1)'
        const arr = [
          `${companyId}`,`${jobName}`,`经验${jobExperience.join('-')}年`,`${education}`,`${jobSalary[0]}k-${jobSalary[1]}k`,
          `${announcer}`,`${companyName}`,`${type}`,`${peopleNum}`,`${slogan}`,`${city}`,`${situation}`
        ]
        db.query(addSql, arr, (error) => {
          if (error) throw error
          res.send({ code: SUCCESS_CODE, msg: '保存成功!' })
        })
      })
    })
  })
}

function delPosition() {
  app.post('/delPosition', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const {id} = JSON.parse(params)
      const sql = `DELETE FROM job WHERE id=${id}`
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
  getPosition,
  getAllPosition,
  getPositionById,
  getPositionInfo,
  insertPosition,
  delPosition
}
