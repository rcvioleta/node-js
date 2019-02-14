const express = require('express');
const path = require('path');

const rootDir = require('../utility/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = adminData.products;
    res.render('shop', { products: products, pageTitle: 'Shop', page: 'shop' });
});

module.exports = router;