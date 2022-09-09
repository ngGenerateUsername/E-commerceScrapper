import  puppeteer  from "puppeteer";



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

const wikiProduct = async(productSearch:String) =>{


    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
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
        const price:String = await grapInfoWiki(``);
        
        console.log({name,href,image})
       }
        
    } catch (error) {
        console.log(error);
        return null;
    }

};

//*[@id="product_list"]/div[9]/div/div[1]/div[1]/a/img

//*[@id="product_list"]/div[1]/div/div[1]/h4/a
//*[@id="product_list"]/div[2]/div/div[1]/h4/a


//*[@id="product_list"]/div[1]/div/div[1]/div[1]/a
//*[@id="product_list"]/div[3]/div/div[1]/div[1]/a





wikiProduct('dell')