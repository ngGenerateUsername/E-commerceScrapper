import {Router} from "express";
import allRouters from "./all";
import jumiaRoutes from "./jumiaRoutes";
import scoopRoutes from "./scoopRoutes";
import wikiRoutes from "./wikiRoutes";


const routers:Router = Router();



routers.use('/scoop',scoopRoutes);
routers.use('/jumia',jumiaRoutes);
routers.use('/wiki',wikiRoutes);
routers.use('/all',allRouters);

export default routers;