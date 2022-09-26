import puppeteer  from "puppeteer";
import { productModel } from "../types/productModel";


const grapInfoScoop = async (path: string, page: puppeteer.Page): Promise<String> => {
    try {
        const [productInfoGrap] = await page.$x(path);
        const grapped: string = await (await productInfoGrap.getProperty('textContent')).jsonValue();
        return grapped;
    } catch (error) {
        console.log(error);
        return '';
    }
}

const scoopProducts = async (productSearch: String):Promise<productModel[] |null> => {
    let productsScoop:productModel[] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //optimization
    await page.setViewport({width:1920,height:1080});
    await page.setRequestInterception(true);
    page.on('request',(req)=>
    {
        if(req.resourceType() == 'image' || req.resourceType() == 'stylesheet' || req.resourceType() == 'font')
        {
            req.abort();
        }else
        {
            req.continue();
        }
    }
    );


    try {
        await page.goto(`https://www.scoop.com.tn/search?search_query=${productSearch}`);
        const [xPathElem] = await page.$x('//*[@id="center_column"]/div[2]/ul');
        const nbrFils = await page.evaluate((e)=>{
            return e.childNodes.length;
        },xPathElem);

        for(let i  = 1 ; i <= nbrFils; i++)
        {
            //name
            const name:String = await grapInfoScoop(`//*[@id="center_column"]/div[2]/ul/li[${i}]/div/div/div[2]/h5/a`,page)
            //image
            const image:String = await grapInfoScoop(`//*[@id="center_column"]/div[2]/ul/li[${i}]/div/div/div[1]/div/div[1]/a/img/@src`,page);
            //price
            const price:String =  await grapInfoScoop(`//*[@id="center_column"]/div[2]/ul/li[${i}]/div/div/div[2]/div[1]/span`,page);
            //href
            const href:String = await grapInfoScoop(`//*[@id="center_column"]/div[2]/ul/li[${i}]/div/div/div[2]/h5/a/@href`,page);
            //description
            const description:String = await grapInfoScoop(`//*[@id="center_column"]/div[2]/ul/li[${i}]/div/div/div[2]/p`,page);

            productsScoop.push({name,image,href,description,price});
        }
        console.log(productsScoop);
        return productsScoop;
        
    } catch (error) {
        console.log(error);
        await browser.close();
        return null;
    }
    
}



scoopProducts('rog');