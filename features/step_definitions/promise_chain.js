'use strict';

var expect = require('chai').expect;

module.exports = function() {
    this.World = require('../support/world.js').World;
    
    var BUTTON_SELECTOR = {linkText: 'Next'},
        HEADER_SELECTOR = {tagName: 'h1'},
        SLEEP_TIME = 100;

    this.Given(/^test page is opened$/, function () {
        return this.driver.get('http://localhost:8080');
    });
    
    this.When(
        /^test run (with|without) promise chain (\d+) times$/,
        function (type, n, callback) {
            this.runNumber = n;
            function pushIt() {
                if (n > 0) {
                    self.driver.findElement(HEADER_SELECTOR).getText().then(function(ht){
                        self.checkedTitles.push(ht);
                        self.driver.findElement(BUTTON_SELECTOR).getText().then(function(bt){
                            self.checkedTexts.push(bt);
                            self.driver.findElement(BUTTON_SELECTOR).click().then(function(){
                                self.driver.sleep(SLEEP_TIME).then(function(){
                                    n--;
                                    pushIt();
                                });
                            });
                        });
                    });
                } else {
                    callback();
                }
            }
            var self = this;
            if (type == "with") {
                pushIt();
            } else {
                for (var i = 0; i < n; ++i) {
                    self.driver.findElement(HEADER_SELECTOR).getText().then(function(t){
                        self.checkedTitles.push(t);
                    });
                    self.driver.findElement(BUTTON_SELECTOR).getText().then(function(t){
                        self.checkedTexts.push(t);
                    });
                    self.driver.findElement(BUTTON_SELECTOR).click();
                    if (i == n - 1) {
                        this.driver.sleep(SLEEP_TIME).then(callback);
                    } else {
                        this.driver.sleep(SLEEP_TIME);
                    }
                }
            }
        }
    );
    
    this.Then(/^all (titles|buttons) have checked$/, function (what, callback) {
        expect(this[what == 'titles' ? 'checkedTitles' : 'checkedTexts']).to.have.length(this.runNumber);
        callback();
    });
};