import  { Router,Request,Response } from "express";
import {jumiaProducts} from "../scrap/jumia";


var jumiaRoutes:Router = Router();


jumiaRoutes.get('/search/:key',async(req:Request,res:Response):Promise<Response>=>{
    const toSearch:String = req.params.toString();
    try {
      const productFounded=await jumiaProducts(toSearch);
      return res.send(productFounded);    
    } catch (error) {
        return res.status(400).send({error});
    }
   
});



export default jumiaRoutes;