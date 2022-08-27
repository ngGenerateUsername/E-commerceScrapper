import puppeteer, { ElementHandle } from "puppeteer";


const grapInfoJumia = async (path: string, page: puppeteer.Page): Promise<String | boolean> => {
    try {
        const [productInfoGrap] = await page.$x(path);
        const grapped: string = await (await productInfoGrap.getProperty('textContent')).jsonValue();
        return grapped;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const jumiaProducts = async (productSearch: String) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        await page.goto(`https://www.jumia.com.tn/catalog/?q=${productSearch}&page=1#catalog-listing`, { timeout: 300000 });
        const [xPathElem] = await page.$x('//*[@id="jm"]/main/div[2]/div[3]/section/div[1]');
        //les nombre des articles trouvée
        const nbrFils = await page.evaluate((e) => {
            const children = e.childNodes;
            return e.childNodes.length;
        }, xPathElem)
        //loop list of products
        for (let i = 1; i <= nbrFils; i++) {
            //get id of product
            const id = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-id`, page);

            //get id of product
            const categorie = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-category`, page);
            
            //get data-name awiat path here
            const name = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-name`, page);

            //get brand wait path
            const brand = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@data-brand`, page);

            //get price
            const price = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/div[2]/div[contains(@class,'prc')]`, page);

            //get image
            const image = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/div[contains(@class,'img-c')]/img/@data-src`, page);

            //get link to the product
            const href = await grapInfoJumia(`//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[${i}]/a/@href`, page);

            console.log({ id, name, price, brand, image, href, categorie })



        }

    } catch (error) {
        console.log(error)
    }


    await browser.close();
    console.log('End of App')
}


jumiaProducts('dell g15');


//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[1]/a
//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[2]/a
//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[44]/a
//*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[48]/a
/*Price  */
////*[@id="jm"]/main/div[2]/div[3]/section/div[1]/article[47]/a/div[2]/div
