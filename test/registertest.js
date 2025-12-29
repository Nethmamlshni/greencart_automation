import {Builder,By,Key,until} from 'selenium-webdriver';
import {expect} from 'chai';
    
describe ('User Register', function(){
    let drivers;
    this.timeout(300000);

    before (async function(){
        drivers = await new Builder().forBrowser('chrome').build();
    })

    after (async function(){
        await drivers.quit();
    })

    it ('Enter valid data with register successfully',async function () {
       
        await drivers.get('https://greencart-gs.vercel.app/');
        await drivers.manage().window().fullscreen();
        const displayed = await drivers.wait(until.elementLocated(By.xpath("//img[@alt='logo']")), 100000);
        expect(displayed).to.not.be.null;
        console.log('Greencard web page loaded successfully');

        const loginbutton = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Login']")),100000);
        await loginbutton.click();
        console.log('login button click successfully');

        const clickhere = await drivers.wait(until.elementLocated(By.xpath("//span[normalize-space()='click here']")),100000);
        await clickhere.click();
        console.log('Click here button click successfully ');

        const signup = await drivers.wait(until.elementLocated(By.xpath("//span[normalize-space()='User']")),100000);
        expect(signup).to.not.be.null;
        console.log('Register page loaded successfully');

        await drivers.findElement(By.xpath("//input[@type='text' and @required]")).sendKeys('Nethma Malshani');
        await drivers.findElement(By.xpath("//input[@type='email' and @required]")).sendKeys('nethmamalshani20@gmail.com');
        await drivers.findElement(By.xpath("//input[@type='password' and @required]")).sendKeys('nethmamalshani20@gmail.com');
        await drivers.findElement(By.xpath("//button[normalize-space()='Create Account']")).click();
        const profile = await drivers.wait(until.elementLocated(By.xpath("//img[contains(@src,'profile_icon')]")), 100000);

        expect(profile).to.not.be.null;
        console.log('Register successfully');
    })


    it ('User register with invalid data ', async function() {
        
        await drivers.get('https://greencart-gs.vercel.app/');
        const displayed = await drivers.wait(until.elementLocated(By.xpath("//img[@alt='logo']")), 100000);
        expect(displayed).to.not.be.null;
        console.log('Greencard web page loaded successfully');

        const loginbutton = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Login']")),100000);
        await loginbutton.click();
        console.log('login button click successfully');

        const clickhere = await drivers.wait(until.elementLocated(By.xpath("//span[normalize-space()='click here']")),100000);
        await clickhere.click();
        console.log('Click here button click successfully ');

        const signup = await drivers.wait(until.elementLocated(By.xpath("//span[normalize-space()='User']")),100000);
        expect(signup).to.not.be.null;
        console.log('Register page loaded successfully');

        const name = await drivers.wait(until.elementLocated(By.xpath("//input[@type='text' and @required]")));
        await name.sendKeys('Nethma');
        const email = await drivers.wait(until.elementLocated(By.xpath("//input[@type='email' and @required]")));
        await email.sendKeys('gdcgwbcgqdwbecyh');
        const password = await drivers.wait(until.elementLocated(By.xpath("//input[@type='password' and @required]")));
        await password.sendKeys('gdcgwbcgqdwbecyh');
        await drivers.findElement(By.xpath("//button[normalize-space()='Create Account']")).click();

        const errormsg = await email.getAttribute("validationMessage");
        console.log("Error message", errormsg);

        if(expect(errormsg).to.include('@')){
            console.log("User enter email without @ mark");
        }
        
    })
})
