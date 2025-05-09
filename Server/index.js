const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const salt = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "ecommerce",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(
  session({
    secret: "natnaelSisay1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

///TODO: stripe part
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51R4n1KIhmXx65X8FzdRHVx2kOBAXXUusGu3CNhl24ZIRjgMScuDe3tIktdUWxYWyllsVpVsWfZB4imrX9dScYV2e00HWl0wXOD"
);

app.post("/create-checkout-session", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const { cartItems } = req.body;

  try {
    // Validate cart items
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: "Invalid cart items" });
    }

    // Check if all items are already paid
    const unpaidItems = cartItems.filter((item) => item.payed === 0);
    if (unpaidItems.length === 0) {
      console.log("All items are already paid. No need to redirect to Stripe.");
      return res.json({ message: "All items are already paid." });
    }

    // Validate stock for each unpaid item
    for (const item of unpaidItems) {
      const stockCheckQuery = "SELECT stock FROM products WHERE pid = ?";
      const [result] = await new Promise((resolve, reject) => {
        db.query(stockCheckQuery, [item.pid], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      if (result.stock === 0) {
        return res.status(400).json({
          error: `Product "${item.pname}" is out of stock.`,
        });
      }

      if (result.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for product "${item.pname}". Available: ${result.stock}, Requested: ${item.quantity}`,
        });
      }
    }

    // Prepare Stripe line items for unpaid items
    const lineItems = unpaidItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.pname,
        },
        unit_amount: Math.round(item.price * 100), // Convert price to cents
      },
      quantity: item.quantity,
    }));

    console.log("Line items prepared for Stripe:", lineItems); // Debugging log

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    console.log("Stripe session created:", session); // Debugging log

    // Save transaction details
    const transactionQuery = `
      INSERT INTO transactions (customer_id, vendor_id, product_id, product_name, quantity, total_price, transaction_date, payed)
      VALUES ?
    `;

    const transactionValues = unpaidItems.map((item) => [
      req.session.user.id, // customer_id
      item.Vid, // vendor_id
      item.pid, // product_id
      item.pname, // product_name
      item.quantity, // quantity
      item.price * item.quantity, // total_price
      new Date(), // transaction_date
      1, // payed (1 for true)
    ]);

    db.query(transactionQuery, [transactionValues], (err, result) => {
      if (err) {
        console.error("Error saving transaction:", err);
        return res.status(500).json({ error: "Failed to save transaction" });
      }

      console.log("Transaction saved successfully.");
    });

    // Update stock in the products table
    const stockUpdateQuery = `
      UPDATE products
      SET stock = stock - ?
      WHERE pid = ?
    `;

    unpaidItems.forEach((item) => {
      db.query(stockUpdateQuery, [item.quantity, item.pid], (err, result) => {
        if (err) {
          console.error(
            `Error updating stock for product ID ${item.pid}:`,
            err
          );
        } else {
          console.log(`Stock updated for product ID ${item.pid}`);
        }
      });
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/customers"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post("/updateUser", upload.single("image"), async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const userId = req.session.user.id;
  const { username, password } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const query = `
        UPDATE customers 
        SET username = ?, password = ?, image = COALESCE(?, image)
        WHERE id = ?
      `;
    db.query(query, [username, password, image, userId], (err, result) => {
      if (err) {
        console.error("Error updating user info:", err);
        return res.status(500).json({ error: "Failed to update user info" });
      }

      res.json({ message: "User info updated successfully" });
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ error: "Failed to update user info" });
  }
});

//sellers identity
app.get("/vendorDetail/:Vid", async (req, res) => {
  const { Vid } = req.params;

  try {
    const query = "SELECT username FROM vendors WHERE id = ?";
    db.query(query, [Vid], (err, result) => {
      if (err) {
        console.error("Error fetching vendor details:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch vendor details" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      res.json(result[0]);
    });
  } catch (error) {
    console.error("Error fetching vendor details:", error);
    res.status(500).json({ error: "Failed to fetch vendor details" });
  }
});

//save cart
app.post("/save-cart", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const userId = req.session.user.id;
  const { pid, quantity } = req.body;

  if (!pid || !quantity) {
    return res
      .status(400)
      .json({ error: "Invalid request: pid and quantity are required" });
  }

  try {
    // Check if the product is already purchased
    const checkTransactionQuery = `
      SELECT * FROM transactions 
      WHERE customer_id = ? AND product_id = ? AND payed = 1
    `;
    db.query(checkTransactionQuery, [userId, pid], (err, result) => {
      if (err) {
        console.error("Error checking transactions:", err);
        return res.status(500).json({ error: "Failed to check transactions" });
      }

      if (result.length > 0) {
        // Product is already purchased
        return res
          .status(400)
          .json({ error: "This product has already been purchased." });
      }

      // Check if the product is already in the cart
      const checkCartQuery =
        "SELECT * FROM carts WHERE user_id = ? AND pid = ?";
      db.query(checkCartQuery, [userId, pid], (err, cartResult) => {
        if (err) {
          console.error("Error checking cart:", err);
          return res.status(500).json({ error: "Failed to check cart" });
        }

        if (cartResult.length > 0) {
          // Update the quantity in the cart
          const updateCartQuery = `
            UPDATE carts 
            SET quantity = quantity + ? 
            WHERE user_id = ? AND pid = ?
          `;
          db.query(updateCartQuery, [quantity, userId, pid], (err) => {
            if (err) {
              console.error("Error updating cart:", err);
              return res.status(500).json({ error: "Failed to update cart" });
            }
            return res.json({ message: "Cart updated successfully." });
          });
        } else {
          // Add the product to the cart
          const addToCartQuery = `
            INSERT INTO carts (user_id, pid, quantity) 
            VALUES (?, ?, ?)
          `;
          db.query(addToCartQuery, [userId, pid, quantity], (err) => {
            if (err) {
              console.error("Error adding to cart:", err);
              return res.status(500).json({ error: "Failed to add to cart" });
            }
            return res.json({ message: "Product added to cart successfully." });
          });
        }
      });
    });
  } catch (error) {
    console.error("Error in /save-cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
});

//retrieve cart
app.get("/get-cart", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const userId = req.session.user.id;

  try {
    const query = `
      SELECT DISTINCT 
        c.pid, 
        c.quantity, 
        p.pname, 
        p.price, 
        p.image, 
        p.Vid, 
        COALESCE(
          (SELECT 1 FROM transactions t WHERE t.customer_id = c.user_id AND t.product_id = c.pid LIMIT 1), 
          0
        ) AS payed
      FROM carts c
      JOIN products p ON c.pid = p.pid
      WHERE c.user_id = ?
    `;
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error retrieving cart:", err);
        return res.status(500).json({ error: "Failed to retrieve cart" });
      }

      res.json({ cartItems: result });
    });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
});

const customerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../frontEnd/src/Uploads/customers"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../frontEnd/src/Uploads/products"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const vendorStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../frontEnd/src/Uploads/vendors"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//image uploads
const customerUpload = multer({ storage: customerStorage });
const vendorUpload = multer({ storage: vendorStorage });
const productUpload = multer({ storage: productStorage });

//login
app.post("/login", (req, res) => {
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
            if (result.length === 0)
              return res.json({ Error: "username is incorrect" });
            bcrypt.compare(
              req.body.password,
              result[0].password,
              (err, isMatch) => {
                if (err) return res.json({ Error: "error in password" });
                if (!isMatch)
                  return res.json({ Error: "password is incorrect" });
                req.session.user = result[0]; // Store customer session
                res.json({ status: "login success", role: "customer" });
              }
            );
          });
        } else {
          bcrypt.compare(
            req.body.password,
            result[0].password,
            (err, isMatch) => {
              if (err) return res.json({ Error: "error in password" });
              if (!isMatch) return res.json({ Error: "password is incorrect" });
              req.session.user = result[0]; // Store vendor session
              res.json({ status: "login success", role: "vendor" });
            }
          );
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
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ Error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ status: "Logout successful" });
  });
});

//customer register
app.post("/register", customerUpload.single("image"), (req, res) => {
  const checkUserQuery = "SELECT * FROM customers WHERE username = ?";
  db.query(checkUserQuery, [req.body.username], (err, result) => {
    if (err) return res.json({ Error: "error in checking username" });
    if (result.length > 0)
      return res.json({ Error: "username already exists" });
    const query =
      "INSERT INTO customers (username, password, fullName, image, email) VALUES (?)";
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.json({ Error: "unable to hash password" });
      const values = [
        req.body.username,
        hash,
        req.body.fullName,
        req.file ? req.file.filename : null,
        req.body.email,
      ];

      db.query(query, [values], (err, result) => {
        if (err) return res.json({ Error: "registration error" });
        res.json({ status: "Registered successfully" });
      });
    });
  });
});

//get userInfo
app.get("/userInfo", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//user-info for account frontEnd
app.get("/user-info", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const userId = req.session.user.id;

  try {
    const query =
      "SELECT username, password, image FROM customers WHERE id = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user info:", err);
        return res.status(500).json({ error: "Failed to fetch user info" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(result[0]);
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

//profile name and image
app.get("/customerProfile", (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.session.user.id;
  const query = "SELECT username FROM customers WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching customer details:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch customer details" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ username: result[0].username });
  });
});

//get customers
app.get("/listOfCustomers", (req, res) => {
  const query = `
        SELECT 
            c.id, 
            c.fullName, 
            c.username, 
            COALESCE((SELECT COUNT(*) FROM transactions t WHERE t.customer_id = c.id), 0) AS transaction_count
        FROM customers c
    `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching customers with transaction count:", err);
      return res.json({ Error: "Error fetching customers" });
    }
    res.json(result);
  });
});

//get products
app.get("/listOfProducts", (req, res) => {
  if (!req.session.user) return res.send("unauthorized user!");
  const q = "SELECT * FROM products WHERE Vid = (?)";
  db.query(q, [req.session.user.id.toString()], (err, result) => {
    if (err) return res.json({ Error: "error fetching products" });
    res.json(result);
  });
});

//get products for customer
app.get("/listofpoducts", (req, res) => {
  const q = "SELECT * FROM products";
  db.query(q, (err, result) => {
    if (err) return res.json({ Error: "error fetching products" });
    res.json(result);
  });
});

//change password for admin
app.post("/change-password-admin", (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const query = "SELECT * FROM admins WHERE id = ?";
  db.query(query, [req.session.user.id.toString()], (err, result) => {
    if (err) return res.json({ Error: "Error fetching current password" });

    if (currentPassword !== result[0].password)
      return res.json({ Error: "Current password is incorrect" });

    const updateQuery = "UPDATE admins SET password = ? WHERE id = ?";
    db.query(updateQuery, [newPassword, req.session.user.id], (err, result) => {
      if (err) return res.json({ Error: "Error updating password" });
      res.json({ status: "Password changed successfully" });
    });
  });
});

//change password for vendors
app.post("/change-password-vendor", (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!req.session.user) {
    return res.json({ Error: "Unauthorized user!" });
  }

  const vendorId = req.session.user.id;

  const query = "SELECT password FROM vendors WHERE id = ?";
  db.query(query, [vendorId], (err, result) => {
    if (err) {
      console.error("Error fetching vendor password:", err);
      return res.json({ Error: "Error fetching vendor password" });
    }

    if (result.length === 0) {
      return res.json({ Error: "Vendor not found" });
    }

    const hashedPassword = result[0].password;

    bcrypt.compare(currentPassword, hashedPassword, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.json({ Error: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.json({ Error: "Current password is incorrect" });
      }

      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          console.error("Error hashing new password:", err);
          return res.json({ Error: "Error hashing new password" });
        }

        const updateQuery = "UPDATE vendors SET password = ? WHERE id = ?";
        db.query(updateQuery, [hash, vendorId], (err, result) => {
          if (err) {
            console.error("Error updating password:", err);
            return res.json({ Error: "Error updating password" });
          }
          res.json({ status: "Password changed successfully" });
        });
      });
    });
  });
});

app.get("/counts", (req, res) => {
  const queries = {
    customers: "SELECT COUNT(*) AS count FROM customers",
    products: "SELECT COUNT(*) AS count FROM products",
    vendors: "SELECT COUNT(*) AS count FROM vendors",
    transactions: "SELECT COUNT(*) AS count FROM transactions",
  };

  const counts = {};

  const promises = Object.keys(queries).map((key) => {
    return new Promise((resolve, reject) => {
      db.query(queries[key], (err, result) => {
        if (err) {
          console.error(`Error fetching ${key} count:`, err);
          return reject(err);
        }
        counts[key] = result[0].count;
        resolve();
      });
    });
  });

  Promise.all(promises)
    .then(() => {
      res.json(counts); // Send the counts as a JSON response
    })
    .catch((error) => {
      console.error("Error fetching counts:", error);
      res.status(500).json({ error: "Failed to fetch counts" });
    });
});

//add vendors through admin
app.post("/addVendor", vendorUpload.single("image"), (req, res) => {
  const checkUserQuery = "SELECT * FROM vendors WHERE username = ?";
  db.query(checkUserQuery, [req.body.username], (err, result) => {
    if (err) return res.json({ Error: "error in checking username" });
    if (result.length > 0)
      return res.json({ Error: "username already exists" });

    const query =
      "INSERT INTO vendors (username, password, fullName, image) VALUES (?)";

    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return res.json({ Error: "unable to hash password" });
      const values = [
        req.body.username,
        hash,
        req.body.fullName,
        req.file ? req.file.filename : null,
      ];

      db.query(query, [values], (err, result) => {
        if (err) return res.json({ Error: "registration error" });
        res.json({ status: "Vendor added successfully" });
      });
    });
  });
});

//get all vendors
app.get("/vendorlist", (req, res) => {
  const query = `
        SELECT 
            v.id, 
            v.fullname, 
            v.username, 
            image,
            (SELECT COUNT(*) FROM products p WHERE p.Vid = v.id) AS product_count
        FROM vendors v
    `;
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching vendor list:", err);
      return res.json({ Error: "Error in fetching vendor list" });
    }
    res.json(result); // Send the result with product counts
  });
});

//delete vendor
app.delete("/deleteVendor/:id", (req, res) => {
  const query = "DELETE FROM vendors WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.json({ Error: "error in deleting vendor" });
    res.json({ status: "Vendor deleted successfully" });
  });
});

//delete product
app.delete("/deleteProduct/:id", (req, res) => {
  const query = "DELETE FROM products WHERE pid = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.json({ Error: "error in deleting product" });
    res.json({ status: "product deleted successfully" });
  });
});

//update vendor
app.put("/updateVendor/:id", vendorUpload.single("image"), (req, res) => {
  const query =
    "UPDATE vendors SET username = ?, password = ?, fullName = ?, image = ? WHERE id = ?";
  bcrypt.hash(req.body.password, salt, (err, hash) => {
    if (err) return res.json({ Error: "unable to hash password" });
    const values = [
      req.body.username,
      hash,
      req.body.fullName,
      req.file ? req.file.filename : null,
      req.params.id,
    ];

    db.query(query, values, (err, result) => {
      if (err) return res.json({ Error: "error in updating vendor" });
      res.json({ status: "Vendor updated successfully" });
    });
  });
});

//update product
app.put("/updateProduct/:id", productUpload.single("image"), (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ Error: "Unauthorized: No session found" });
  }

  const query =
    "UPDATE products SET pname = ?, pdescription = ?, price = ?, category = ?, stock = ?, image = ? WHERE pid = ?";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
    req.file ? req.file.filename : null,
    req.params.id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating product:", err);
      return res.json({ Error: "error in updating product" });
    }
    res.json({ status: "Product updated successfully" });
  });
});

//add products
app.post("/addProducts", productUpload.single("image"), (req, res) => {
  const query =
    "INSERT INTO products (pname, pdescription, price, category, stock, Vid, image) VALUES (?,?,?,?,?,?,?)";
  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.category,
    req.body.stock,
    req.session.user.id,
    req.file ? req.file.filename : null,
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.json({ Error: "adding error" });
    res.json({ status: "Product added successfully" });
  });
});

//change stock
app.put("/changeStock/:id", (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ Error: "Unauthorized: No session found" });
  }

  const { stockChange } = req.body;
  const query = "UPDATE products SET stock = stock + ? WHERE pid = ?";
  const values = [stockChange, req.params.id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating stock:", err);
      return res.json({ Error: "error in updating stock" });
    }
    res.json({ status: "Stock updated successfully" });
  });
});

//recently added products
app.get("/recentProducts", (req, res) => {
  const query = "SELECT * FROM products ORDER BY pid DESC LIMIT 10";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching recent products:", err);
      return res.json({ Error: "error fetching recent products" });
    }
    res.json(result);
  });
});

//full info about product(detail page)
app.get("/productDetail/:id", (req, res) => {
  const query = "SELECT * FROM products WHERE pid = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error fetching product details:", err);
      return res.json({ Error: "error fetching product details" });
    }
    res.json(result[0]);
  });
});

//count in vendor dashboard
app.get("/vendor-stats", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const vendorId = req.session.user.id;

  try {
    // Query to count the number of products for the vendor
    const productCountQuery =
      "SELECT COUNT(*) AS productCount FROM products WHERE vid = ?";
    const productCountResult = await new Promise((resolve, reject) => {
      db.query(productCountQuery, [vendorId], (err, result) => {
        if (err) reject(err);
        else resolve(result[0].productCount);
      });
    });

    const soldCountQuery =
      "SELECT COUNT(*) AS soldCount FROM transactions WHERE vendor_id = ?";
    const soldCountResult = await new Promise((resolve, reject) => {
      db.query(soldCountQuery, [vendorId], (err, result) => {
        if (err) reject(err);
        else resolve(result[0].soldCount);
      });
    });

    const profitQuery =
      "SELECT SUM(total_price) AS totalProfit FROM transactions WHERE vendor_id = ?";
    const profitResult = await new Promise((resolve, reject) => {
      db.query(profitQuery, [vendorId], (err, result) => {
        if (err) reject(err);
        else resolve(result[0].totalProfit || 0);
      });
    });

    res.json({
      productCount: productCountResult,
      soldCount: soldCountResult,
      totalProfit: profitResult,
    });
  } catch (error) {
    console.error("Error fetching vendor stats:", error);
    res.status(500).json({ error: "Failed to fetch vendor stats" });
  }
});

//vendor cards for customers showing
app.get("/vendor-latest-transactions", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const vendorId = req.session.user.id;

  try {
    const query = `
        SELECT 
          t.transaction_date, 
          t.product_name, 
          c.username, 
          c.image AS logo, 
          c.email 
        FROM transactions t
        JOIN customers c ON t.customer_id = c.id
        WHERE t.vendor_id = ?
        ORDER BY t.transaction_date DESC
        LIMIT 3
      `;

    db.query(query, [vendorId], (err, results) => {
      if (err) {
        console.error("Error fetching latest transactions:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch latest transactions" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching latest transactions:", error);
    res.status(500).json({ error: "Failed to fetch latest transactions" });
  }
});

//customer most bought
app.get("/most-bought-products", async (req, res) => {
  try {
    const query = `
        SELECT 
          p.pid, 
          p.pname, 
          p.price, 
          p.image, 
          COUNT(t.product_id) AS transaction_count
        FROM transactions t
        JOIN products p ON t.product_id = p.pid
        GROUP BY t.product_id
        ORDER BY transaction_count DESC
        LIMIT 8
      `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching most bought products:", err);
        return res
          .status(500)
          .json({ error: "Failed to fetch most bought products" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching most bought products:", error);
    res.status(500).json({ error: "Failed to fetch most bought products" });
  }
});

//filter products in search page of customers
app.get("/filter-products", async (req, res) => {
  const { category, search } = req.query;

  try {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (search) {
      query += " AND pname LIKE ?";
      params.push(`%${search}%`);
    }

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error filtering products:", err);
        return res.status(500).json({ error: "Failed to filter products" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({ error: "Failed to filter products" });
  }
});

////FEEDBACK PART
app.post("/submit-feedback", async (req, res) => {
  if (!req.session.user || !req.session.user.id) {
    return res.status(401).json({ error: "Unauthorized: No session found" });
  }

  const uid = req.session.user.id; // Get user ID from session
  const { issue, info } = req.body; // Get issue and info from the request body
  const date = new Date(); // Get the current date

  if (!issue || !info) {
    return res.status(400).json({ error: "Issue and info are required" });
  }

  try {
    const query = `
        INSERT INTO feedback (uid, issue, info, date)
        VALUES (?, ?, ?, ?)
      `;
    const values = [uid, issue, info, date];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error saving feedback:", err);
        return res.status(500).json({ error: "Failed to save feedback" });
      }
      res.json({ message: "Feedback submitted successfully" });
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

app.get("/feedback-list", async (req, res) => {
  const query = `
      SELECT f.id, f.issue, f.uid, f.status, c.username
      FROM feedback f
      JOIN customers c ON f.uid = c.id
    `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching feedback list:", err);
      return res.status(500).json({ error: "Failed to fetch feedback list" });
    }
    res.json(results);
  });
});

app.put("/update-feedback-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate the status value
  if (!["pending", "fixed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const query = "UPDATE feedback SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error("Error updating feedback status:", err);
      return res
        .status(500)
        .json({ error: "Failed to update feedback status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json({ message: "Feedback status updated successfully" });
  });
});

app.delete("/remove-feedback/:id", async (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM feedback WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error removing feedback:", err);
      return res.status(500).json({ error: "Failed to remove feedback" });
    }
    res.json({ message: "Feedback removed successfully" });
  });
});

app.get("/feedback-detail/:id", async (req, res) => {
  const { id } = req.params;

  const query = `
      SELECT f.id, f.issue, f.info, f.status, c.username
      FROM feedback f
      JOIN customers c ON f.uid = c.id
      WHERE f.id = ?
    `;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching feedback detail:", err);
      return res.status(500).json({ error: "Failed to fetch feedback detail" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    res.json(result[0]);
  });
});

app.use(express.static(path.join(__dirname, "../frontEnd/build")));

//main process
app.listen(4000, () => {
  console.log("Server is running....");
  if (!db) {
    console.log("Error in connecting to database");
  } else {
    console.log("Database connected successfully");
  }
});
