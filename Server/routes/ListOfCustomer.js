const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'ecommerce'
})

router.get('', (req, res)=>{
    const q = 'SELECT * FROM customers';
    db.query(q, (err, result)=>{
        if(err) return res.json({Error:'error fetching customers'})
        res.json(result);
    })
})

module.exports = router;