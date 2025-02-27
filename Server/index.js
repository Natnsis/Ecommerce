const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session'); 
const salt = 10;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'ecommerce'
});

app.use(session({
    secret:'natnaelSisay1234',
    resave:false,
    saveUninitialized:false,
}));

app.post('/register', (req, res)=>{
    const query = "INSERT INTO customers (username, password, fullName, image, email) VALUES (?)";
    
    bcrypt.hash(req.body.password,salt, (err, hash)=>{
        if(err) return res.json({Error:"unable to hash password"});
        const values = [
            req.body.username,
            hash,
            req.body.fullName,
            req.body.image,
            req.body.email
        ]
    
    } );

    db.query(query,[values], (err, result)=>{
        if(err) return res.json({Error:"registration error"});
        res.json({status:"Registered successfully"});
    });
})





app.listen(4000, ()=>{
    console.log('Server is running....');
    if(!db){
        console.log('Error in connecting to database');
    }
    else{
        console.log('Database connected successfully');
    }
})