const Products = require('../models/product');
const Cart = require('../models/cart');

const fetchAllProducts = (fileToRender, res, pageTitle, page) => {
    Products.findAll()
        .then(products => {
            res.render(fileToRender, {
                products: products,
                pageTitle: pageTitle,
                page: page
            })
        })
        .catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
    fetchAllProducts('shop/product-list', res, 'Shop', 'show-products')
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Products.findByPk(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                page: 'show-products'
            })
        })
        .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart
                .getProducts()
                .then(products => {
                    res.render('shop/cart', {
                        products: products,
                        pageTitle: 'Your Cart',
                        page: 'cart'
                    });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart
                .getProducts({
                    where: {
                        id: prodId
                    }
                })
        })
        .then(products => {
            let product;
            if (products.length > 0) product = products[0];
            let newQty = 1;
            if (product) {
                // increase cart qty
            }
            return Products.findByPk(prodId)
                .then(product => {
                    fetchedCart.addProduct(product, {
                        through: {
                            quantity: newQty
                        }
                    });
                })
                .catch(err => console.log(err));
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    fetchAllProducts('shop/index', res, 'Shop', 'shop');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        page: 'checkout'
    });
}