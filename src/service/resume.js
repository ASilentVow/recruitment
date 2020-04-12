const { app, db } = require('./app')
const { SUCCESS_CODE } = require('./SERVE_SEM')

function saveResume() {
 app.post('/saveResume', (req, res) => {
   let params = ''
   req.on("data", (chunk) => {
     params += chunk
   })
   req.on("end", () => {
     const {
       name, sex, id,
       birth, phone,
       status, email,
       job, salary, volunteer,
       advantage, education, type
     } = JSON.parse(params)
     if (type === 'save') {
       const sql =
         `INSERT INTO resume (name, sex, userId, birth, phone, status, email, job, salary, advantage, education, volunteer)
          VALUES ("${name}", "${sex}", "${id}", "${birth}", "${phone}", "${status}", "${email}",
           "${job}", "${salary.join('-')}", "${advantage}", "${education}", "${volunteer}")`
       db.query(sql, (err) => {
         if(err) throw err
         res.send({ code: SUCCESS_CODE, msg: '保存成功!' })
       })
     } else {
       const sql = 'UPDATE resume SET name = ?,sex=?,birth=?,phone = ?,status = ?,email = ?,job = ?,' +
         'salary = ?,advantage = ?,education = ?,volunteer = ? WHERE userId = ?'
       const paramsArr = [
         `${name}`, `${sex}`,
         `${birth}`, `${phone}`,
         `${status}`, `${email}`,
         `${job}`, `${salary.join('-')}`,
         `${advantage}`, `${education}`,`${volunteer}`, id]
       db.query(sql, paramsArr,(err) => {
         if(err) throw err
         res.send({ code: SUCCESS_CODE, msg: '保存成功!' })
       })
     }
   })
 })
}

function getResume() {
  app.get('/getResume', (req, res) => {
    const { userId } = req.query
    const sql = `SELECT * from resume WHERE userId="${userId}"`
    db.query(sql, (err, result) => {
      if (err) throw err
      const data = JSON.parse(JSON.stringify(result))
      res.send({ data: data[0] || null })
    })
  })
}

module.exports = {
  saveResume,
  getResume
}
