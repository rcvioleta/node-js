const Products = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Products.fetchAll(products => {
        res.render('shop/product-list', {
            products: products,
            pageTitle: 'Shop',
            page: 'show-products'
        });
    });
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Products.findById(productId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Details',
            page: 'show-products'
        })
    })
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        page: 'cart'
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Products.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
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