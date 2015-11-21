'use strict';

var fs = require('fs');
var webdriver = require('selenium-webdriver');
var platform = process.env.PLATFORM || "CHROME";

var capabilities = null;
switch (platform) {
    case 'CHROME':
	capabilities = webdriver.Capabilities.chrome();
	break;
    case 'FIREFOX':
	capabilities = webdriver.Capabilities.firefox();
	break;
}

var buildChromeDriver = function() {
    return new webdriver.Builder().
        withCapabilities(capabilities).
        build();
};
var driver = buildChromeDriver();

var getDriver = function() {
    return driver;
};

var World = function World() {

    var defaultTimeout = 20000;
    var screenshotPath = "screenshots";

    this.webdriver = webdriver;
    this.driver = driver;
    
    this.checkedTitles = [];
    this.checkedTexts = [];
    this.runNumber = 0;

    if(!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }

    this.waitFor = function(locatorOfFn, timeout) {
        var waitTimeout = timeout || defaultTimeout;
        if (typeof locatorOfFn === "function") {
            return driver.wait(locatorOfFn, waitTimeout);
        } else {
            if (typeof locatorOfFn === "string") {
                locatorOfFn = {css: locatorOfFn};
            }
            return driver.wait(function () {
                return driver.isElementPresent(locatorOfFn).then(function(present) {
                    if (!present) {
                        return false;
                    } else {
                        return driver.findElement(locatorOfFn).isDisplayed();
                    }
                });
            }, waitTimeout);
        }
    };
};

module.exports.World = World;
module.exports.getDriver = getDriver;