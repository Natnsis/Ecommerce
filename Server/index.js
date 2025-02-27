const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session'); 
const multer = require('multer');
const path = require('path'); // Import path module
const salt = 10;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'ecommerce',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
});

app.use(session({
    secret:'natnaelSisay1234',
    resave:false,
    saveUninitialized:false,
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontEnd/src/Uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

app.post('/register', upload.single('image'), (req, res) => {
    const checkUserQuery = "SELECT * FROM customers WHERE username = ?";
    db.query(checkUserQuery, [req.body.username], (err, result) => {
        if (err) return res.json({ Error: "error in checking username" });
        if (result.length > 0) return res.json({ Error: "username already exists" });

        const query = "INSERT INTO customers (username, password, fullName, image, email) VALUES (?)";
        
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.json({ Error: "unable to hash password" });
            const values = [
                req.body.username,
                hash,
                req.body.fullName,
                req.file ? req.file.filename : null,
                req.body.email
            ];

            db.query(query, [values], (err, result) => {
                if (err) return res.json({ Error: "registration error" });
                res.json({ status: "Registered successfully" });
            });
        });
    });
});

app.post('/login', (req, res) => {
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

app.listen(4000, () => {
    console.log('Server is running....');
    if (!db) {
        console.log('Error in connecting to database');
    } else {
        console.log('Database connected successfully');
    }
});