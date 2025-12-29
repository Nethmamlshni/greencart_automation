import {Builder, By , until} from 'selenium-webdriver';
import {expect} from 'chai';

describe ('Add to card option ', function(){

    let drivers;
    this.timeout(300000);

    before (async function(){
        drivers = await new Builder(). forBrowser('chrome').build();
    })

    after (async function() {
        await drivers.quit();
    })

    it ('Add to card option', async function (){
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

        await drivers.findElement(By.xpath("//input[@type='email' and @required]")).sendKeys('nethmamalshani20@gmail.com');
        await drivers.findElement(By.xpath("//input[@type='password' and @required]")).sendKeys('nethmamalshani20@gmail.com');
        const loginBtn = await drivers.findElement(By.xpath("//form//button[normalize-space()='Login']"))
        await loginBtn.click();

        const profile = await drivers.wait(until.elementLocated(By.xpath("//img[contains(@src,'profile_icon')]")), 100000);

        expect(profile).to.not.be.null;
        console.log('Login successfully');

        const products = await drivers.wait(until.elementLocated(By.xpath("//a[normalize-space()='All Product']")),100000);
        await products.click();

        const page = await drivers.wait(until.elementIsVisible(drivers.findElement(By.xpath("//p[normalize-space()='All products']"))),100000);
        expect(await page.isDisplayed()).to.equal(true);
        console.log("Product page is loaded successfully");

        let product = await drivers.wait(until.elementLocated(By.xpath("//p[normalize-space()='Bakery']")),100000);
        await product.click();
        let product01 = await drivers.wait(until.elementIsVisible(drivers.findElement(By.xpath("//img[contains(@src,'greencart')]"))),100000);
        expect( await product01.isDisplayed()).to.equal(true);
        console.log("Product 01 is visibled");

        let Count = await drivers.wait(until.elementLocated(By.xpath("//button[contains(@class,'h-4.5')]")),100000); 
        let beforeCount = await Count.getText(); 
        let add = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Add to Cart']")),100000); 
        await add.click(); 
        let addcard = await drivers.wait(until.elementLocated(By.xpath("//button[contains(@class,'h-4.5')]")),200000); 
        let afterCount = await addcard.getText(); 
        expect(Number(afterCount)).to.equal(Number(beforeCount) + 1); 
        console.log("Product 01 add in to card as successfully");

        await drivers.navigate().back();

        product = await drivers.wait(until.elementLocated(By.xpath("//p[normalize-space()='Grains']")),100000);
        await product.click();
        product01 = await drivers.wait(until.elementIsVisible(drivers.findElement(By.xpath("//img[contains(@src,'greencart')]"))),100000);
        expect( await product01.isDisplayed()).to.equal(true);
        console.log("Product 02 is visibled");

        Count = await drivers.wait(until.elementLocated(By.xpath("//button[contains(@class,'h-4.5')]")),100000); 
        beforeCount = await Count.getText(); 
        add = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Add to Cart']")),100000); 
        await add.click(); 
        addcard = await drivers.wait(until.elementLocated(By.xpath("//button[contains(@class,'h-4.5')]")),200000); 
        afterCount = await addcard.getText(); 
        expect(Number(afterCount)).to.equal(Number(beforeCount) + 1); 
        console.log("Product 02 add in to card as successfully");
    })

   
})

