import  { Router,Request,Response } from "express";


var jumiaRoutes:Router = Router();


jumiaRoutes.get('search/:key',(req:Request,res:Response):Response=>{

    const param = req.params;

    return res.send(param);
});



export default jumiaRoutes;