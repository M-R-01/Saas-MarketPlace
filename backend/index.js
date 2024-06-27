import { PORT } from "./config.js";
import express from "express";
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import multer from "multer";
import path from 'path';

const app = express();

//middlewares
app.use(express.json());
app.use(
    cors(
        {
            origin: 'http://localhost:5173',
            credentials: true,
            methods: ['GET', 'POST']
        }
    ));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: false
    }
}))


//Multi-part form data middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'productImage') {
            cb(null, 'uploads/images');
        } else if (file.fieldname === 'productFile') {
            cb(null, 'uploads/files');
    
    }},
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
    }
})


const upload = multer({ storage: storage });


//Salt for hashing passwords
const saltRounds = 10;

//Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: 'test'
})

app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}`);
})


//Signup endpoint
app.post('/signup', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const type = req.body.type;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) console.log(err);
        db.query('INSERT INTO users (username, email, mobile, password, category) VALUES(?,?,?,?,?)', 
        [name, email, mobile, hash, type], (err, result) => {
            console.log(err);
            res.send('User registered successfully');
        });
    })
});


//Login check endpoint
app.get('/login', (req, res) => {
    if (req.session.user) {
        res.send(true);
    } else {
        res.send(false);
    }
})

//Login endpoint
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM users WHERE email =?', [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving user');
        }
    
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    req.session.user = result;
                    console.log(result);
                    res.json({ 
                        message: 'successful',
                        type: result[0].Category});
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    });
})

//Forgot password endpoint
app.post('/forgot-password', (req, res) => {
    const email = req.body.email;

    db.query('SELECT * FROM users WHERE email =?', [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving user');
        }

        if (result.length > 0) {
            // Generate a new password by combining username and mobile number
            const username = result[0].Username;
            const mobile = result[0].mobile;
            const newPassword = username.substring(0, 5) + mobile.substring(0,3);
            bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                if (err) console.log(err);
                db.query('UPDATE users SET password =? WHERE email =?', [hash, email], (err, result) => {
                    console.log(err);
                    console.log(newPassword)

                });
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    })
})


//New product endpoint
app.post('/new-product', upload.single('productImage'), (req, res) => {
    console.log(req.file);
    const name = req.body.productName;
    const snippet = req.body.productSnippet;
    const description = req.body.productDescription;
    const price = req.body.productPrice;
    const category = req.body.productCategory;
    const subscription = req.body.productSubscription;


    db.query('INSERT INTO products (ProductName, ProductSnippet, ProductDescription, ProductPrice, ProductCategory, ProductSubscription, ProductImage) VALUES(?,?,?,?,?,?,?)', 
        [name, snippet, description, price, category, subscription, req.file.path], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error uploading product');

            }
            db.query('SELECT ProductId FROM products WHERE ProductImage =?', [req.file.path], (err,result) => {
                console.log(err);
                console.log(result);
                res.json({ productId: result[0].ProductId, message: 'Product uploaded successfully' });
            });
        });
})

app.post('/upload-product-file', upload.single('productFile'), (req, res) => {
    const productId = req.body.productId;
    const seller = req.body.productSeller;

    db.query('UPDATE products SET ProductFile =?, ProductSeller =? WHERE ProductId =?', [req.file.path, seller, productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading product file');
        }
        res.json({ message: 'Product file uploaded successfully' });
    });
})

//Product list endpoint
app.get('/products', (req, res) => {
    db.query('SELECT * FROM Products', (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving product list');
        }
        res.json(result);
    });
})

app.get('/product-image/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT ProductImage FROM Products WHERE ProductId =?', [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving product image');
        }
        const imagePath = result[0].ProductImage;
        res.sendFile(path.resolve(imagePath)); // Use the 'path' module to resolve the image path
    });
});


//Product details endpoint
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT * FROM Products WHERE ProductId =?', [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving product details');
        }
        res.json(result[0]);
    });
})

app.get('/my-products/:user', (req, res) => {
    const user = req.params.user;
    console.log(user);
    db.query('SELECT * FROM Products WHERE ProductSeller =?', [user], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving user products');
        }
        res.json(result);
    })
})

//Product rating endpoint
app.post('/rate-product/:id', (req, res) => {
    const productId = req.body.productId;
    const rating = req.body.rating;

    db.query('SELECT ProductRating FROM Products WHERE ProductId =?', [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving product rating');
        }
        const totalRating = (result[0].ProductRating + rating)*0.5;

        db.query('UPDATE Products SET ProductRating = ? WHERE ProductId =?', [totalRating, productId], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error updating product rating');
            }
            res.json({ message: 'Product rating updated successfully' });
        });
    });
})

app.get('/get-rating/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT ProductRating FROM Products WHERE ProductId =?', [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving product rating');
        }
        res.json(result[0]);
    })
})