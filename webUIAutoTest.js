
describe ('Visit the website and select channel categories and article', function(){

	browser.waitForAngularEnabled(false);
	browser.get('https://hk01.com/');

	var sideBar = element(by.xpath("//nav[1]/div/div[2]"));
	var home = element(by.xpath("//div[@id='logo']/img[@src='//cdn.hk01.com/assets/images/logo.png']"));

	it('Click Side bar menu', function(){
		browser.get('https://hk01.com/');
		console.log('Accessed website');
		
		browser.wait(function(){
			return sideBar.isPresent();
		}, 5000, 'Side bar not present');
		sideBar.click();




	});

	it('Choose 社區 channel',function(){
		var channelOne = element(by.xpath("//ul[@class='menu__submenu--list']/li/a[@href='https://www.hk01.com/channel/社區']"));

		browser.wait(function(){
			return channelOne.isDisplayed();
		}, 5000, '社區 Channel is not present');

		channelOne.click();
		expect(browser.getCurrentUrl()).toEqual('https://www.hk01.com/channel/%E7%A4%BE%E5%8D%80');
		expect(element(by.xpath("//div[@class='menu__mid--current']/a[@href='https://www.hk01.com/channel/社區']")).getText()).toEqual('社區');
		console.log('社區 Channel was displayed');


	});

	it('Choose 兩岸 section', function(){
		sideBar.click();
		var channeltwo = element(by.xpath("//ul[@class='menu__submenu--list']/li/a[@href='https://www.hk01.com/section/兩岸']"));

		browser.wait(function(){
			return channeltwo.isPresent();
		},5000, '兩岸 Section is not present');

		channeltwo.click();
		expect(browser.getCurrentUrl()).toEqual('https://www.hk01.com/section/%E5%85%A9%E5%B2%B8');
		expect(element(by.xpath("//div[@class='menu__mid--current']/a[@href='https://www.hk01.com/channel/兩岸']")).getText()).toEqual('兩岸');
		console.log('兩岸 Section was displayed');
		// browser.sleep(5000);
	});

	it('Go home and select an article',function(){
		// browser.sleep(3000);
		home.click();
		var newsArticles = element.all(by.css('.grid_three .item'));		

			getArticleUrl().then(function(result){
				newsArticles.get(0).click();

				expect(browser.getCurrentUrl()).toEqual(result);
				console.log('Article was displayed');

			});

	});

	function getArticleUrl() {

	var newsArticles = element.all(by.css('.grid_three .item'));
    var item = protractor.promise.defer();

    browser.wait(function() {
        return newsArticles.get(0).getAttribute("href").then(function(urlContent) {
            var result = urlContent !== '';
            if (result) {
                item.fulfill(urlContent);
            }
            return result;
        });
    }, 5000, 'Cannot find any article');
    return item.promise;
	}

});