const Products = require('../models/product');

exports.getProducts = (req, res, next) => {
    Products.fetchAll(products => {
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'Shop',
            page: 'show-products'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        page: 'cart'
    });
}

exports.getIndex = (req, res, next) => {
    Products.fetchAll(products => {
        res.render('shop/index', {
            products: products,
            pageTitle: 'Shop',
            page: 'shop'
        });
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        page: 'checkout'
    });
}