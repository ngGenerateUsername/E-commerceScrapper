import puppeteer from "puppeteer";
import { productModel } from "../types/productModel";

const grapInfoJumia = async (path: string, page: puppeteer.Page): Promise<String> => {
    try {
        const [productInfoGrap] = await page.$x(path);
        const grapped: string = await (await productInfoGrap.getProperty('textContent')).jsonValue();
        return grapped;
    } catch (error) {
        console.log(error);
        return '';
    }
}

const jumiaProducts = async (productSearch: String):Promise<productModel[] |null> => {
    let productsJumia:productModel[] = [];
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
    //end opt
    try {
        await page.goto(`https://www.jumia.com.tn/catalog/?q=${productSearch}&page=1#catalog-listing`, { timeout: 300000 });
        const [xPathElem] = await page.$x('//*[@id="jm"]/main/div[2]/div[3]/section/div[1]');
        //les nombre des articles trouvée
        const nbrFils = await page.evaluate((e) => {
            return e.childNodes.length;
        }, xPathElem)
        //loop list of products
        for (let i = 1; i <= nbrFils; i++) {
            //get id of product
            const id:String = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-id`, page);

            //get category of product
            const categorie:String = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-category`, page);
            
            //get data-name awiat path here
            const name:String = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-name`, page);

            //get brand wait path
            const brand:String = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-brand`, page);

            //get price
            const price = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/div[2]/div[contains(@class,'prc')]`, page);

            //get image
            const image = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/div[contains(@class,'img-c')]/img/@data-src`, page);

            //get link to the product
            const href = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@href`, page);
            productsJumia.push({ id, name, price, brand, image, href, categorie });
            //console.log({ id, name, price, brand, image, href, categorie });
            
        }
        await browser.close();
        return productsJumia;
    } catch (error) {
        console.log(error);
        await browser.close();
        return null;
    }   
}


//jumiaProducts('dell g15');
export  {jumiaProducts};