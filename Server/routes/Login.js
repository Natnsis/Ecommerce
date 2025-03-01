const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const salt = 10;

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'ecommerce',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

router.post('/', (req, res) => {
    const q = "SELECT * FROM admins WHERE username = (?)";
    db.query(q, [req.body.username], (err, result) => {
        if (err) return res.json({ Error: "error in login" });
        if (result.length === 0) {
            const query = "SELECT * FROM vendors WHERE username = (?)";
            db.query(query, [req.body.username], (err, result) => {
                if (err) return res.json({ Error: "error in login" });

                if (result.length === 0) {
                    const query = "SELECT * FROM customers WHERE username = (?)";
                    db.query(query, [req.body.username], (err, result) => {
                        if (err) return res.json({ Error: "error in login" });
                        if (result.length === 0) return res.json({ Error: "username is incorrect" });
                        bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => { // customer success
                            if (err) return res.json({ Error: "error in password" });
                            if (!isMatch) return res.json({ Error: "password is incorrect" });
                            req.session.user = result[0];
                            req.session.username = req.body.username; // Store username in session
                            res.json({ status: "login success", role: "customer" });
                        });
                    });
                } else { 
                    bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
                        if (err) return res.json({ Error: "error in password" });
                        if (!isMatch) return res.json({ Error: "password is incorrect" });
                        req.session.user = result[0];
                        req.session.username = req.body.username; // Store username in session
                        res.json({ status: "login success", role: "vendor" });
                    });
                }
            });
        } else {
            if (req.body.password === result[0].password) {
                req.session.user = result[0];
                req.session.username = req.body.username; // Store username in session
                res.json({ status: "login success", role: "admin" });
            } else {
                res.json({ Error: "password is incorrect" });
            }
        }
    });
});

module.exports = router;