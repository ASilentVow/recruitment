const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'recruitment'
})

const selectSql = 'SELECT * from job WHERE id=1'
db.query(selectSql, (err, result) => {
  const data = JSON.parse(JSON.stringify(result))
  data.forEach(v => {
    const parSql = `SELECT * from company WHERE companyId=${v.parentId}`
    db.query(parSql, ((error, res) => {
      if(error) throw error
      const copyRes = JSON.parse(JSON.stringify(res))
      const updateSql = `UPDATE job SET situation="${copyRes[0].situation}" WHERE id=${v.id}`
      db.query(updateSql, (upErr) => {
        if(upErr) throw upErr
        console.log('更新成功')
      })
    }))
  })
})
