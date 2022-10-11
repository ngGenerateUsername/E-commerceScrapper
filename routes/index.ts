import {Router} from "express";
import jumiaRoutes from "./jumiaRoutes";
import scoopRoutes from "./scoopRoutes";
import wikiRoutes from "./wikiRoutes";


const routers:Router = Router();



routers.use('/scoop',scoopRoutes);
routers.use('/jumia',jumiaRoutes);
routers.use('/wiki',wikiRoutes);

export default routers;