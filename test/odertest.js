import {Builder, By , until} from 'selenium-webdriver';
import {expect} from 'chai';

describe ('Create oder ', function(){

    let drivers;
    this.timeout(300000);

    before (async function(){
        drivers = await new Builder(). forBrowser('chrome').build();
    })

    after (async function() {
        await drivers.quit();
    })

    it ('Create oder with add address', async function (){
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

        let profile = await drivers.wait(until.elementLocated(By.xpath("//img[contains(@src,'profile_icon')]")), 100000);

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
        
        const cardpage = await drivers.wait(until.elementLocated(By.xpath("//div[contains(@class,'relative') and contains(@class,'cursor-pointer')]/button")),100000);
        await cardpage.click();
        expect(await cardpage.isDisplayed()).to.equal(true);
        console.log("Card page loaded successfully");
        const card = await drivers.wait(until.elementLocated(By.xpath("//h1[contains(@class,'text-3xl') and contains(text(),'Shopping Cart')]")),200000);
        expect(await card.isDisplayed()).to.equal(true);
        console.log("Add to card paged loaded successfully");

        const address = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Change']")),100000);
        await address.click();
        const addAddress = await drivers.wait(until.elementLocated(By.xpath("//p[normalize-space()='Add address']")),100000);
        await addAddress.click();
        const addresspage = await drivers.wait(until.elementLocated(By.xpath("//p[contains(text(),'Add Shipping')]/span[contains(@class,'text-primary')]")),100000);
        expect(await addresspage.isDisplayed()).to.equal(true);
        console.log("Shipping address page loaded successfully");

        const fname = await drivers.wait(until.elementLocated(By.xpath("//input[@name='firstName']")),100000);
        await fname.sendKeys('Nethma');
        const lname = await drivers.wait(until.elementLocated(By.xpath("//input[@name='lastName']")),100000);
        await lname.sendKeys('Malshani');
        const email = await drivers.wait(until.elementLocated(By.xpath("//input[@name='email']")),100000);
        await email.sendKeys('nethmamalshani2003@gmail.com');
        const street = await drivers.wait(until.elementLocated(By.xpath("//input[@name='street']")),100000);
        await street.sendKeys('Rathmahara');
        const city = await drivers.wait(until.elementLocated(By.xpath("//input[@name='city']")),100000);
        await city.sendKeys('Pananal');
        const state = await drivers.wait(until.elementLocated(By.xpath("//input[@name='state']")),100000);
        await state.sendKeys('Kadirapola');
        const zipcode = await drivers.wait(until.elementLocated(By.xpath("//input[@name='zipcode']")),100000);
        await zipcode.sendKeys('60200');
        const country = await drivers.wait(until.elementLocated(By.xpath("//input[@name='country']")),100000);
        await country.sendKeys('Sri lanka');
        const tpnumber = await drivers.wait(until.elementLocated(By.xpath("//input[@name='phone']")),100000);
        await tpnumber.sendKeys('0707850091');
        
        const addressbutton = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Save address']")),100000);
        await addressbutton.click();
        const addtocard = await drivers.wait(until.elementLocated(By.xpath("//h1[contains(@class,'text-3xl') and contains(text(),'Shopping Cart')]")),200000);
        expect(await addtocard.isDisplayed()).to.equal(true);
        console.log("Address added successfully");

        const Order = await drivers.wait(until.elementLocated(By.xpath("//button[normalize-space()='Place Order']")),100000);
        expect(await Order.isDisplayed()).to.equal(true);
        console.log("Place order button is displayed");
        await Order.click();
        const orderpage = await drivers.wait(until.elementLocated(By.xpath("//div[contains(@class,'flex') and contains(@class,'items-end') and p[normalize-space()='My orders']]")),100000);
        expect(await orderpage.isDisplayed()).to.equal(true);
        console.log("Oder Created successfully");
        const home = await drivers.wait(until.elementLocated(By.xpath("//a[@data-discover='true' and normalize-space()='Home']")),100000);
        await home.click();

        profile = await drivers.wait(until.elementLocated(By.xpath("//img[contains(@src,'profile_icon')]")), 100000);
        expect(profile).to.not.be.null;
        console.log('Again loaded home page successfully');
        
    });
});