import express from "express";
import cors from "cors";
import mysql from "mysql";
import session from "express-session";

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
    secret:"secretKeyOfMine",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires: 60*60*24
    }   
}));

const db = mysql.createConnection({
    host:"localhost",
    user:"mage-dev",
    password:"12345",
    database:"Ecommerce"
})



app.listen(3004, ()=>{
    console.log("server is running on port 3004")
})