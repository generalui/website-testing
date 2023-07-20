//dotenv.config({ path: '.env' });

/**
 * @param {puppeteer.Browser} browser
 * @param {{url: string, options: LHCI.CollectCommand.Options}} context
 */
module.exports = async (browser, context) => {
  const page = await browser.newPage()
  await page.goto(context.url)

  // Preview Password
  if (page.url().indexOf('/password') > -1) {
    console.log('Password protection detected')
    
    if (!process.env.PREVIEW_PASSWORD) {
      console.log('Authentication failed, missing PREVIEW_PASSWORD')
      await page.close()
      process.exit(0)
    }
    
    await page.waitForSelector('.password-link', {visible: true})
    await page.click('.password-link')

    await page.waitForSelector('#Password', {visible: true})
    await page.type('#Password', process.env.PREVIEW_PASSWORD)

    await page.click('#login_form [name="commit"]')

    await page.waitForTimeout(2000)

    await page.goto(context.url)

    if (page.url().indexOf('/password') > -1) {
      console.log('Authentication failed')
      await page.close()
      process.exit(0)
    } else {
      console.log(`Authenticated`)
    }
  }

  await page.close()
}