import { Router } from "express";

var scoopRoutes:Router = Router();

scoopRoutes.get('search/:key');

export default scoopRoutes;