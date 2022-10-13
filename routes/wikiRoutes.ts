import { Router,Request,Response } from "express";
import { wikiProduct } from "../scrap/wiki";

var wikiRoutes:Router = Router();

wikiRoutes.get('/search/:key',async(req:Request,res:Response):Promise<Response>=>{

    const toSearch:String = req.params.toString();
    try {
    const getWikiProducts = await wikiProduct(toSearch);
    return res.status(200).send(getWikiProducts);
    } catch (error) {
       return res.status(400).send({error}) 
    }
});


export default wikiRoutes;