const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'ecommerce',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const customerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontEnd/src/Uploads/customers'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const customerUpload = multer({ storage: customerStorage });

router.post('/register', customerUpload.single('image'), (req, res) => {
    const checkUserQuery = "SELECT * FROM customers WHERE username = ?";
    db.query(checkUserQuery, [req.body.username], (err, result) => {
        if (err) return res.json({ Error: "error in checking username" });
        if (result.length > 0) return res.json({ Error: "username already exists" });

        const query = "INSERT INTO customers (username, password, fullName, image, email) VALUES (?)";
        const values = [
            req.body.username,
            req.body.password, // Storing password as plain text (not recommended for production)
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

module.exports = router;