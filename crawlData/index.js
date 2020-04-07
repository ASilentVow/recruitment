const puppeteer = require('puppeteer')
const insertCompany = require('./createDB')

const scrape = async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.lagou.com/gongsi/');
  let pageNum = 1
  let result = []
  while (pageNum != '11') {
    await page.click('.pager_next')
    await page.waitFor(1000);
    let arr = await page.evaluate(() => {
      let companyArr = Array.from(document.querySelectorAll('.company-item')).map(v => {
        const desc = v.querySelector('.indus-stage').innerText
        const id = v.querySelector('.top>p>a').getAttribute('href').match(/\d+/)[0]
        return {
          companyName: v.querySelector('.company-name').innerText,
          desc: desc,
          companyImg: v.querySelector('img').getAttribute('src'),
          slogan: v.querySelector('.advantage').innerText,
          jobNum: v.querySelector('.green').innerText,
          type: desc.split('/')[0],
          situation: desc.split('/')[1],
          id: id,
          peopleNum: desc.split('/')[2]
        }
      });
      return companyArr
    });
    result = result.concat(arr)
    pageNum = await page.evaluate(() => document.querySelector('.pager_is_current').innerText)
  }
  browser.close();
  return result;
}

scrape().then(res => {
  insertCompany(res)
})
