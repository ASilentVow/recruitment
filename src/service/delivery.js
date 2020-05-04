const { app, db } = require('./app')
const { SUCCESS_CODE } = require('./SERVE_SEM')


function insertDelivery() {
  app.post('/insertDelivery', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { userId, companyId, jobId } = JSON.parse(params)
      const sql = 'INSERT INTO delivery(jobId, companyId, userId, situation) VALUES (?,?,?,0)'
      const arr = [jobId, `${companyId}`, userId]
      db.query(sql, arr, (error) => {
        if (error) throw error
        res.send({ code: SUCCESS_CODE, msg: '投递成功!' })
      })
    })
  })
}

function getDelivery() {
  app.get('/getDelivery', async (req, res) => {
    const { id } = req.query
    const promiseList = []
    db.query(`SELECT * from delivery WHERE userId=${id}`, async (error1, result1) => {
      const jobList = JSON.parse(JSON.stringify(result1))
      jobList.forEach(v => {
        promiseList.push(new Promise((resolved, rejected) => {
          db.query(`SELECT * from job WHERE id=${v.jobId}`, (error2, result2) => {
            if(error2) rejected(error2)
            const jobInfo = JSON.parse(JSON.stringify(...result2))
            resolved({ ...jobInfo, situation: v.situation })
          })
        }))
      })
      const promiseRes = await Promise.all(promiseList)
      res.send({ data: promiseRes })
    })
  })
}

function updateDelivery() {
  app.post('/updateDelivery', (req, res) => {
    let params = ''
    req.on("data", (chunk) => {
      params += chunk
    })
    req.on("end", () => {
      const { id, flag } = JSON.parse(params)
      const sql = 'UPDATE delivery SET situation=? WHERE id=?'
      const arr = [flag, id]
      db.query(sql, arr, (error) => {
        if (error) throw error
        res.send({ code: SUCCESS_CODE, msg: '操作成功!' })
      })
    })
  })
}

function getReceive() {
  app.get('/getReceive', (req, res) => {
    const { companyId } = req.query
    const promiseList = []
    db.query(`SELECT * from delivery WHERE companyId=${companyId}`, async (error, result) => {
      const list = JSON.parse(JSON.stringify(result))
      list.forEach(v => {
        promiseList.push(new Promise((resolved, rejected) => {
          db.query(`SELECT username from user WHERE id=${v.userId}`, (error1, result1) => {
            if(error) rejected(error1)
            const username = JSON.parse(JSON.stringify(...result1))
            db.query(`SELECT jobName from job WHERE id=${v.jobId}`, (error2, result2) => {
              if(error) rejected(error2)
              const jobInfo = JSON.parse(JSON.stringify(...result2))
              resolved({ ...username, ...jobInfo, userId: v.userId, id: v.id, situation: v.situation })
            })
          })
        }))
      })
      const promiseRes = await Promise.all(promiseList)
      res.send({ data: promiseRes })
    })
  })
}

module.exports = {
  insertDelivery,
  getDelivery,
  getReceive,
  updateDelivery
}
