import {Builder, By , until} from 'selenium-webdriver';
import {expect} from 'chai';
import { takescreenshort } from '../project/screenshot.js';
import loginData from '../data/loginData.json' assert {type:'json'};

describe ('User login(Json) ', function(){
    const{email,password} = loginData.validLogin;

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

        await drivers.findElement(By.xpath("//input[@type='email' and @required]")).sendKeys(email);
        await drivers.findElement(By.xpath("//input[@type='password' and @required]")).sendKeys(password);
        const loginBtn = await drivers.findElement(By.xpath("//form//button[normalize-space()='Login']"))
        await loginBtn.click();

        const profile = await drivers.wait(until.elementLocated(By.xpath("//img[contains(@src,'profile_icon')]")), 100000);

        expect(profile).to.not.be.null;
        console.log('Login successfully');

    })
 
    loginData.invalidLogin.forEach((data,index) =>{
    it (`User Login with invalid credential ${index+1}`, async function (){
        try{
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
        await email.sendKeys(data.email);
        await drivers.findElement(By.xpath("//input[@type='password' and @required]")).sendKeys(data.password);
         const loginBtn = await drivers.findElement(By.xpath("//form//button[normalize-space()='Login']"))
        await loginBtn.click();
        const errormsg = await email.getAttribute("validationMessage");
        console.log('Error message ',errormsg);
        
        expect(errormsg).to.not.be.empty;
        await takescreenshort(drivers,"Invalid Login");

        }catch(error){

            console.log('Error occurred during invalid login ',error);
            await takescreenshort(drivers,"Invalid Login Error");

        }
        

    })
})
})

