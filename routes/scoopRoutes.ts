import { Router,Request,Response } from "express";
import { scoopProducts } from "../scrap/scoop";

var scoopRoutes:Router = Router();

scoopRoutes.get('/search/:key',async(req:Request,res:Response):Promise<Response>=>{

    const toSearch = req.params.toString();
    
    try {
       const productFounded = await scoopProducts(toSearch);
       return res.status(200).send(productFounded); 
    } catch (error) {
        return res.status(400).send({error})
    }


});

export default scoopRoutes;