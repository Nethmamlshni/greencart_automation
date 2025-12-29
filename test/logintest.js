import {Builder, By , until} from 'selenium-webdriver';
import {expect} from 'chai';

describe ('User login ', function(){

    let drivers;
    this.timeout(300000);

    before (async function(){
        drivers = await new Builder(). forBrowser('chrome').build();
    })

    after (async function() {
        await drivers.quit();
    })

    it ('User Login with valid credential', async function (){
        await drivers.get('https://greencart-gs.vercel.app/');
        await drivers.manage().window().fullscreen();
        const displayed = await drivers.wait(until.elementLocated(By.xpath("//img[@alt='logo']")),100000);
        expect(displayed).to.not.be.null;
        console.log('Green card is loaded sussfully');
 
        const loginbutton = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Login']")),100000);
        await loginbutton.click();
        console.log('login button click successfully');

        await drivers.wait(until.elementLocated(By.xpath("//span[normalize-space()='User']")),100000);
        console.log('Login form loaded successfully ');

        await drivers.findElement(By.xpath("//input[@type='email' and @required]")).sendKeys('nethmamalshani10000@gmail.com');
        await drivers.findElement(By.xpath("//input[@type='password' and @required]")).sendKeys('nethmamalshani10000@gmail.com');
        const loginBtn = await drivers.findElement(By.xpath("//form//button[normalize-space()='Login']"))
        await loginBtn.click();

        const profile = await drivers.wait(until.elementLocated(By.xpath("//img[contains(@src,'profile_icon')]")), 100000);

        expect(profile).to.not.be.null;
        console.log('Login successfully');

    })

    it ('User Login with invalid credential', async function (){
        await drivers.get('https://greencart-gs.vercel.app/');
        const displayed = await drivers.wait(until.elementLocated(By.xpath("//img[@alt='logo']")),100000);
        expect(displayed).to.not.be.null;
        console.log('Green card is loaded sussfully');
 
        const loginbutton = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Login']")),100000);
        await loginbutton.click();
        console.log('login button click successfully');

        await drivers.wait(until.elementLocated(By.xpath("//span[normalize-space()='User']")),100000);
        console.log('Login form loaded successfully ');

        const email = await drivers.findElement(By.xpath("//input[@type='email' and @required]"))
        await email.sendKeys('nethmamalshani100@gmail.com');
        await drivers.findElement(By.xpath("//input[@type='password' and @required]")).sendKeys('vsdghsvdhgvSHGD');
         const loginBtn = await drivers.findElement(By.xpath("//form//button[normalize-space()='Login']"))
        await loginBtn.click();
        
        const errormsg = await email.getAttribute("validationMessage");
        console.log('Error message ',errormsg);

    })
})

