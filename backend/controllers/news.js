const { webkit } = require('playwright')
const router = require('express').Router()

const baseUrl = 'https://news.google.com'

router.get('/:symbols', async (req, res) => {
  try {
    const symbols = req.params.symbols.split(',')
    let query = ''
    if (symbols[0] === 'null') {
      query = 'stocks'
    } else {
      for (const symbol of symbols) {
        query += `${symbol}+`
      }
      query += 'stock'
    }

    const responseArray = []
    
    const browser = await webkit.launch({ headless: true })
    const page = await browser.newPage()
    // Navigate to a website 
    await page.goto(`${baseUrl}/search?for=${query}&hl=en-US&gl=US&ceid=US:en`)
    // Do something on the website 
    // ... 
    const articles = await page.locator('article').all()

    for (const article of articles) {
      const title = await article.locator('h3').locator('a').innerText()
      
      const relativeLink = await article.locator('a').first().getAttribute('href')
      const link = baseUrl + relativeLink.substring(1) // absolute link

      const date = await article.locator('time').innerText()

      const firstdiv = article.locator('div').first()
      const count = await firstdiv.locator('img').nth(1).count()
      let logo = null
      if (count) {
        logo = await firstdiv.locator('img').nth(1).getAttribute('src')
      } else {
        logo = await firstdiv.locator('img').first().getAttribute('src')
      }
      const source = await firstdiv.locator('a').innerText()

      let img = null
      if (await article.locator('figure').count()) {
        img = await article.locator('figure').locator('img').getAttribute('src')
      } else {
        const path = article.locator('../..').locator('figure').locator('img')
        const count = await path.count()
        if (count) {
          img = await path.getAttribute('src')
        }
      }

      responseArray.push({ title, link, date, logo, source, img })
    }
    
    await browser.close()
    res.json(responseArray)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router