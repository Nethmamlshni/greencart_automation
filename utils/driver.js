import {Builder, By, until} from 'selenium-webdriver';
import {expect} from 'chai';
import fs from 'fs';

afterEach(async function() {
    if (this.currentTest.state === 'failed') {
        const image = await driver.takeScreenshot();
        fs.writeFileSync(`./screenshots/${this.currentTest.title}.png`, image, 'base64');
        console.log('Screenshot saved for failed test');
    }
});
