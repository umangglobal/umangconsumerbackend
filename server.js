const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'consumer'
});

app.get('/products', (req, res)=>{
    const sql = "SELECT * from products";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get(`/product-description/:productSlug`, (req, res)=>{
    const productSlug  = req.params.productSlug;
    const sql = "SELECT * FROM `products` WHERE `pro_slug` = ?";
    db.query(sql, [productSlug], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    });
});

app.get('/branded-ingredinents', (req, res)=>{
    const sql = "SELECT * from branded_ingredinents";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.get(`/branded-ingredient-details/:ingredientSlug`, (req, res)=>{
    const ingredientSlug  = req.params.ingredientSlug;
    const sql = "SELECT * FROM `branded_ingredinents` WHERE `bi_slug` = ?";
    db.query(sql, [ingredientSlug], (err, data)=>{
        if(err) return res.json(err);
        return res.json(data[0]);
    });
});

app.get('/products-search', (req, res) => {
    const searchInput = req.query.search; // read the search keyword from query params
    const sql = `SELECT * FROM products WHERE pro_name LIKE ? OR pro_heading LIKE ?`;
    const values = [`%${searchInput}%`, `%${searchInput}%`];

    db.query(sql, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});



app.listen(8081, ()=>{
    console.log("Listing at 8081...");
});