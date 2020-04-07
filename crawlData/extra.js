const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'recruitment'
})

let companyArr = []
const idSql = `SELECT * FROM company`
db.query(idSql, (err, res) => {
  if (err) throw err
  companyArr = JSON.parse(JSON.stringify(res))
  companyArr.forEach(v => {
    const desc = v.companyDesc.split('/')
    const updateSql = `UPDATE job SET announcer="${v.companyName}", companyName="${v.companyName}", type="${desc[0]}", peopleNum="${desc[2]}", slogan="${v.slogan}" WHERE parentId=${v.companyId}`
    console.log(updateSql, 'updateSql')
    db.query(updateSql, (updateErr, res) => {
      if (updateErr) throw updateErr
      console.log('更新成功')
    })
  })
})
