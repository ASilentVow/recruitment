const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'recruitment'
})

db.query('SELECT * from company', (err, res) => {
  const arr = JSON.parse(JSON.stringify(res))
  arr.forEach(v => {
    const { companyId, companyName } = v
    const sql = `INSERT user (companyId, username, password, type) VALUES ("${companyId}", "${companyName}", "123456", "0")`
    db.query(sql, (error) => {
      if(error) throw error
      console.log('成功')
    })
  })
})
