const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session'); 
const multer = require('multer');
const path = require('path'); 
const salt = 10;

//route imports
const loginRouter = require('./routes/Login')



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

const customerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontEnd/src/Uploads/customers'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const vendorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontEnd/src/Uploads/vendors'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const customerUpload = multer({ storage: customerStorage });
const vendorUpload = multer({ storage: vendorStorage });


// login routes
app.use("/login", loginRouter);


app.post('/register', customerUpload.single('image'), (req, res) => {
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


////////////////////////////////////////////////////////////////////////////////////////////
app.post('/change-password-admin', (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.json({ Error: "Passwords do not match" });
    }

    const query = "SELECT password FROM admins WHERE id = ?"; // Adjust the query to match your database schema
    db.query(query, [req.session.user.id], (err, result) => {
        if (err) return res.json({ Error: "Error fetching current password" });

        if (currentPassword !== result[0].password) return res.json({ Error: "Current password is incorrect" });

        const updateQuery = "UPDATE admins SET password = ? WHERE id = ?"; // Adjust the query to match your database schema
        db.query(updateQuery, [newPassword, req.session.user.id], (err, result) => {
            if (err) return res.json({ Error: "Error updating password" });
            res.json({ status: "Password changed successfully" });
        });
    });
});


/////////////////////////////////////////////////////////////////////////////////////////
app.post('/addVendor', vendorUpload.single('image'), (req, res) => {
    const checkUserQuery = "SELECT * FROM vendors WHERE username = ?";
    db.query(checkUserQuery, [req.body.username], (err, result) => {
        if (err) return res.json({ Error: "error in checking username" });
        if (result.length > 0) return res.json({ Error: "username already exists" });

        const query = "INSERT INTO vendors (username, password, fullName, image) VALUES (?)";
        
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.json({ Error: "unable to hash password" });
            const values = [
                req.body.username,
                hash,
                req.body.fullName,
                req.file ? req.file.filename : null
            ];

            db.query(query, [values], (err, result) => {
                if (err) return res.json({ Error: "registration error" });
                res.json({ status: "Vendor added successfully" });
            });
        });
    });
});


////////////////////////////////////////////////////////////////////////////////////////
app.get('/vendorlist', (req, res) => {
    const query = "SELECT * FROM vendors";
    db.query(query, (err, result) => {
        if (err) return res.json({ Error: "error in fetching vendor list" });
        res.json(result);
    });
});

app.delete('/deleteVendor/:id', (req, res) => {
    const query = "DELETE FROM vendors WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.json({ Error: "error in deleting vendor" });
        res.json({ status: "Vendor deleted successfully" });
    });
});

app.put('/updateVendor/:id', vendorUpload.single('image'), (req, res) => {
    const query = "UPDATE vendors SET username = ?, password = ?, fullName = ?, image = ? WHERE id = ?";
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return res.json({ Error: "unable to hash password" });
        const values = [
            req.body.username,
            hash,
            req.body.fullName,
            req.file ? req.file.filename : null,
            req.params.id
        ];

        db.query(query, values, (err, result) => {
            if (err) return res.json({ Error: "error in updating vendor" });
            res.json({ status: "Vendor updated successfully" });
        });
    });
});


////////////////////////////////////////////////////////////////////////////////////////
app.get('/session', (req, res) => {
    if (req.session.username) {
        res.json({ username: req.session.username });
    } else {
        res.status(401).json({ Error: "Not logged in" });
    }
});



////////////////////////////////////////////////////////////////////////////////////////
app.listen(4000, () => {
    console.log('Server is running....');
    if (!db) {
        console.log('Error in connecting to database');
    } else {
        console.log('Database connected successfully');
    }
});