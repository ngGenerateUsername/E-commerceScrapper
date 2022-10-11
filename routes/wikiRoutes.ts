import { Router } from "express";

var wikiRoutes:Router = Router();

wikiRoutes.get('search/:key');


export default wikiRoutes;