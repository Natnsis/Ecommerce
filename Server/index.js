const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session'); 
const multer = require('multer');
const path = require('path'); 
const salt = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST","DELETE","PUT"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


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
    secret: 'natnaelSisay1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

const customerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontEnd/src/Uploads/customers'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontEnd/src/Uploads/products'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
})

const vendorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontEnd/src/Uploads/vendors'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

//image uploads
const customerUpload = multer({ storage: customerStorage });
const vendorUpload = multer({ storage: vendorStorage });
const productUpload = multer({storage: productStorage});




//login
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
                        bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
                            if (err) return res.json({ Error: "error in password" });
                            if (!isMatch) return res.json({ Error: "password is incorrect" });
                            req.session.user = result[0]; // Store customer session
                            res.json({ status: "login success", role: "customer" });
                        });
                    });
                } else { 
                    bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
                        if (err) return res.json({ Error: "error in password" });
                        if (!isMatch) return res.json({ Error: "password is incorrect" });
                        req.session.user = result[0]; // Store vendor session
                        res.json({ status: "login success", role: "vendor"});
                        
                    });
                }
            });
        } else {
            if (req.body.password === result[0].password) {
                req.session.user = result[0]; // Store admin session
                res.json({ status: "login success", role: "admin" });
            } else {
                res.json({ Error: "password is incorrect" });
            }
        }
    });
});

//logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ Error: 'Failed to logout' });
        }
        res.clearCookie('connect.sid'); 
        res.json({ status: 'Logout successful' });
    });
});



//customer register
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

//get userInfo
app.get('/userInfo', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});


//get customers
app.get('/listOfCustomers', (req, res)=>{
    const q = 'SELECT * FROM customers';
    db.query(q, (err, result)=>{
        if(err) return res.json({Error:'error fetching customers'})
        res.json(result);
    })
})

//get products
app.get('/listOfProducts', (req, res)=>{
   if(!req.session.user) return res.send("unauthorized user!")
    const q = 'SELECT * FROM products WHERE Vid = (?)';
    db.query(q,[req.session.user.id.toString()], (err, result)=>{
        if(err) return res.json({Error:'error fetching products'})
        res.json(result);
    })
})


//get products for customer
app.get('/listofpoducts', (req, res)=>{
     const q = 'SELECT * FROM products';
     db.query(q, (err, result)=>{
         if(err) return res.json({Error:'error fetching products'})
         res.json(result);
     })
 })

//admin change password
app.post('/change-password-admin', (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const query = "SELECT * FROM admins WHERE id = ?"; 
    db.query(query, [req.session.user.id.toString()], (err, result) => {
        if (err) return res.json({ Error: "Error fetching current password" });

        if (currentPassword !== result[0].password) return res.json({ Error: "Current password is incorrect" });

        const updateQuery = "UPDATE admins SET password = ? WHERE id = ?"; 
        db.query(updateQuery, [newPassword, req.session.user.id], (err, result) => {
            if (err) return res.json({ Error: "Error updating password" });
            res.json({ status: "Password changed successfully" });
        });
    });
});


//add vendors through admin
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



//get all vendors
app.get('/vendorlist', (req, res) => {
    const query = "SELECT * FROM vendors";
    db.query(query, (err, result) => {
        if (err) return res.json({ Error: "error in fetching vendor list" });
        res.json(result);
    });
});



//delete vendor
app.delete('/deleteVendor/:id', (req, res) => {
    const query = "DELETE FROM vendors WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.json({ Error: "error in deleting vendor" });
        res.json({ status: "Vendor deleted successfully" });
    });
});

//delete product
app.delete('/deleteProduct/:id', (req, res) => {
    const query = "DELETE FROM products WHERE pid = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) return res.json({ Error: "error in deleting product" });
        res.json({ status: "product deleted successfully" });
    });
});


//update vendor
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


//update product
app.put('/updateProduct/:id', productUpload.single('image'), (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ Error: 'Unauthorized: No session found' });
    }

    const query = "UPDATE products SET pname = ?, pdescription = ?, price = ?, category = ?, stock = ?, image = ? WHERE pid = ?";
    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.stock,
        req.file ? req.file.filename : null,
        req.params.id
    ];



    console.log('Updating product with values:', values);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating product:', err);
            return res.json({ Error: "error in updating product" });
        }
        res.json({ status: "Product updated successfully" });
    });
});


//add products
app.post('/addProducts', productUpload.single('image'), (req, res) => {
    const query = "INSERT INTO products (pname, pdescription, price, category, stock, Vid, image) VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        req.body.stock,
        req.session.user.id,
        req.file ? req.file.filename : null
    ];

    db.query(query, values, (err, result) => {
        if (err) return res.json({ Error: "adding error" });
        res.json({ status: "Product added successfully" });
    });
});


//change stock
app.put('/changeStock/:id', (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ Error: 'Unauthorized: No session found' });
    }

    const { stockChange } = req.body;
    const query = "UPDATE products SET stock = stock + ? WHERE pid = ?";
    const values = [stockChange, req.params.id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating stock:', err);
            return res.json({ Error: "error in updating stock" });
        }
        res.json({ status: "Stock updated successfully" });
    });
});



//recently added products
app.get('/recentProducts', (req, res) => {
    const query = "SELECT * FROM products ORDER BY pid DESC LIMIT 10";
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching recent products:', err);
            return res.json({ Error: "error fetching recent products" });
        }
        res.json(result);
    });
});

//full info about product(detail page)
app.get('/productDetail/:id', (req, res) => {
    const query = "SELECT * FROM products WHERE pid = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching product details:', err);
            return res.json({ Error: "error fetching product details" });
        }
        res.json(result[0]);
    });
});


app.use(express.static(path.join(__dirname, '../frontEnd/build')));

//main process
app.listen(4000, () => {
    console.log('Server is running....');
    if (!db) {
        console.log('Error in connecting to database');
    } else {
        console.log('Database connected successfully');
    }
});