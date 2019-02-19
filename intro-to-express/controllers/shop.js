const Products = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Products.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                products: rows,
                pageTitle: 'Shop',
                page: 'show-products'
            })
        })
        .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Products.findById(prodId)
        .then(([product]) => {
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: 'Product Details',
                page: 'show-products'
            })
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    Products.fetchAll(products => {
        Cart.getCart(cart => {
            const cartProducts = [];
            for (let product of products) {
                const cartData = cart.products.find(prod => prod.id === product.id);
                if (cartData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartData.qty
                    });
                }
            }
            res.render('shop/cart', {
                products: cartProducts,
                pageTitle: 'Your Cart',
                page: 'cart'
            });
        });
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
    Products.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                products: rows,
                pageTitle: 'Shop',
                page: 'shop'
            })
        })
        .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        page: 'checkout'
    });
}