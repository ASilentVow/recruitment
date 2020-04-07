const puppeteer = require('puppeteer')
const mysql = require('mysql')

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'recruitment'
})

db.connect()

const sql = 'SELECT companyId from company WHERE id > 150 and id < 161'
let idArr = []
db.query(sql, (err, res) => {
  if (err) throw err
  idArr = JSON.parse(JSON.stringify(res)).map(v => v.companyId)
})

const scrape = async () => {
  let jobArr = []
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  while(idArr.length) {
    const curId = idArr.shift()
    await page.goto(`https://www.lagou.com/gongsi/j${curId}.html`)
    await page.waitFor(1000);
    await page.click('.con_filter_li:nth-child(1)')
    await page.waitFor(1000);
    let arr = await page.evaluate(() => {
      const getArr = Array.from(document.querySelectorAll('.con_list_item')).map(v => {
        const jobDesc = v.querySelector('.item_desc').innerText
        return {
          jobName: v.querySelector('.item_title').innerText,
          jobExperience: jobDesc.split('/')[0],
          education: jobDesc.split('/')[1],
          jobSalary: v.querySelector('.item_salary').innerText,
        }
        return v.innerHTML
      })
      return getArr
    })
    arr.forEach(v => { v.parentId = curId })
    jobArr = jobArr.concat(arr)
  }
  browser.close();
  return jobArr;
}

function insert(arr) {
  arr.forEach(v => {
    const insertSql = 'INSERT INTO job ( parentId, jobName, jobExperience, education, jobSalary )' +
      `VALUES ( "${v.parentId}", "${v.jobName}", "${v.jobExperience}", "${v.education}", "${v.jobSalary}" )`;
    db.query(insertSql, (err, res) =>{
      if (err) throw err
      console.log('插入成功')
    })
  })
  db.end()
}

scrape().then(res => {
  insert(res)
})
