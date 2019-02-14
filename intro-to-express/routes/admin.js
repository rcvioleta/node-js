const express = require('express');
const path = require('path');

const rootDir = require('../utility/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'admin.html'));
    res.render('add-product', { pageTitle: 'Add Product', page: 'products' });
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;