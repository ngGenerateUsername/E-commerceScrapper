import  puppeteer  from "puppeteer";
import { productModel } from "../types/productModel";



const grapInfoWiki = async(path:string,page:puppeteer.Page):Promise<String>=>{

    try {
        // await page.waitForXPath(path,{timeout:50000});
        const [productInfoGrap] = await page.$x(path);
        const grapped: string = await (await productInfoGrap.getProperty('textContent')).jsonValue();
        return grapped;
    } catch (error) {
        console.log(error);
        return '';
    }
}

const wikiProduct = async(productSearch:String):Promise<productModel[]> =>{
    try {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    //optimization
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setRequestInterception(true);
    page.on('request',(req)=>{
        if(req.resourceType() == 'image' || req.resourceType() == 'stylesheet' || req.resourceType()=='font')
        {
            req.abort();
        }else
        {
            req.continue();
        }
    });
    //end opt


    var productList:productModel[] = [];
 
        await page.goto(`https://www.wiki.tn/recherche?controller=search&orderby=position&orderway=desc&search_query=${productSearch}&submit_search=`,{timeout:50000});
        const [xPathElem] = await page.$x('//*[@id="product_list"]');
        const nbrFils = await page.evaluate((e)=>{
            const children = e.childNodes;
            return e.childNodes.length;
        },xPathElem);
        
       //loop list of products 
       for(let i=1;i<=nbrFils;i++)
       {
        //product name
        const name:String = await grapInfoWiki(`//*[@id="product_list"]/div[${i}]/div/div[1]/h4/a`,page);
        //link to the product
        const href:String = await grapInfoWiki(`//*[@id="product_list"]/div[${i}]/div/div[1]/div[1]/a/@href`,page);
        //img to the product 
        const image:String = await grapInfoWiki(`//*[@id="product_list"]/div[${i}]/div/div[1]/div[1]/a/img/@src`,page);
        
        //price of the product
        const price:String = await grapInfoWiki(`//*[@id="product_list"]/div[${i}]/div/div[2]/div/div[1]/div/span`,page);
        //brand of the product
        const brand:String = await grapInfoWiki(`//*[@id="product_list"]/div[${i}]/div/div[1]/div[2]/img/@alt`,page);
        //description of the product
        const description = await grapInfoWiki(`//*[@id="product_list"]/div[${i}]/div/div[2]/div/div[2]/div/span[2]`,page);

        //get catégorie 
        // const newPage = await browser.newPage();
        // await newPage.setViewport({ width: 1920, height: 1080 });
        // await newPage.setRequestInterception(true);
        // newPage.on('request',(req)=>{
        //     if(req.resourceType() == 'image' || req.resourceType() == 'stylesheet' || req.resourceType()=='font')
        //     {
        //         req.abort();
        //     }else
        //     {
        //         req.continue();
        //     }
        // })
        // await newPage.goto(href.toString());
        // const categorieGrap:String = await grapInfoWiki('//*[@id="breadcrumb"]/div/div[1]',newPage);
        // const categorie = categorieGrap.split('>')[categorieGrap.split('>').length - 2];
        

        productList.push({name,image,price,brand,href,description});
        // await newPage.close();
       }

    //   await page.close();

      console.log(productList);
      return productList;
        
    } catch (error) {
        console.log(error);
        return null;
    }

};
wikiProduct('dell')