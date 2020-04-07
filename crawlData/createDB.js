const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'recruitment'
})

function insertCompany(companyArr) {
  db.connect()
  const cityArr = ['北京','上海','深圳','广州','杭州','成都','南京','武汉','西安','厦门','长沙','苏州','天津']
  companyArr.forEach(v =>{
    const randomNum = Math.floor(Math.random()*13)
    const insertSql = 'INSERT INTO company ( companyId, companyName, companyDesc, companyImg, slogan, type, jobNum, city, situation, peopleNum )' +
      `VALUES ( "${v.id}", "${v.companyName}", "${v.desc}", "${v.companyImg}", "${v.slogan}", "${v.type}", "${v.jobNum}", "${cityArr[randomNum]}", "${v.situation}", "${v.peopleNum}" )`;
    db.query(insertSql, (err, res) =>{
      if (err) throw err
      console.log('插入成功')
    })
  })
  db.end()
}

module.exports = insertCompany
