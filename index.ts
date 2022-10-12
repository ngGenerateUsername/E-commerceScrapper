import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import routers from "./routes";
import helmet from "helmet";

var app:express.Application=express();
const forms:multer.Multer = multer();


app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(forms.fields([]));
app.use(helmet());

app.use(routers);


app.listen(8080,()=>{console.log('connected successfully! ....');});