import fs from 'fs';
import path from 'path';

export async function takescreenshort(drivers,testname){
    const image =  await drivers.takeScreenshot();

    const dir ='./screenshot';
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const filepath = path.join(dir,`${testname}_${Date.now()}.png`);

    fs.writeFileSync(filepath, image, 'base64');
    console.log("Screenshort file path - ",`${filepath}`);

}