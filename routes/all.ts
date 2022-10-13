import { Router,Request,Response } from "express";
import { jumiaProducts } from "../scrap/jumia";
import { scoopProducts } from "../scrap/scoop";
import { wikiProduct } from "../scrap/wiki";


const allRouters:Router = Router();

allRouters.get('/search/:key',async(req:Request,res:Response):Promise<Response>=>{

    const toSearch:String = req.params.toString();
    try {
       const jumia = await jumiaProducts(toSearch);
       const wiki = await wikiProduct(toSearch);
       const scoop = await scoopProducts(toSearch);

       return res.send({jumia,scoop,wiki});

    } catch (error) {
        return res.status(400).send(error);
    }


});


export default allRouters;