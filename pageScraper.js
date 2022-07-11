const scraperObject = {
    //url: 'https://linktr.ee/draplin',
	//url: 'https://linktr.ee/katyperry',
    async scraper(browser, url){
        try{
            this.url = url;
            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            // Navigate to the selected page
            await page.goto(this.url);
            // Wait for the required DOM to be rendered
            await page.waitForSelector('#__next');
            // Get the link to all the required books
            let urls = await page.$$eval("[data-testid='StyledContainer']", links => {
                // Make sure the book to be scraped is in stock
                //links = links.filter(link => link.querySelector('.instock.availability > i'))
                // Extract the links from the data
               try{
                links = links.map(el => el.querySelector('a').href)
               }catch(e){
                console.log(e);
               }
                //console.log("In scraper")
                //console.log(links);
                
                return links;
            });
            //console.log("In scraper2")
            //console.log(urls);
			return urls;
			//Get main image of each url
			
        }catch(e){
            console.log(e);
        }
    }
}

module.exports = scraperObject;