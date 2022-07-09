const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, url){
	let browser;
	try{
		browser = await browserInstance;
		var urls = await pageScraper.scraper(browser, url);	
		//console.log("In pageController");
		//console.log(urls);
		return urls;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, url) => scrapeAll(browserInstance, url)