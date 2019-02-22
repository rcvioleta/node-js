const Products = require('../models/product');

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
    let newQty = 1;
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
            if (product) {
                const oldQuantity = product.cartItem.qty;
                newQty = oldQuantity + 1;
                return product;
            }
            return Products.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {
                    qty: newQty
                }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    fetchAllProducts('shop/index', res, 'Shop', 'shop');
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({
            include: ['products']
        })
        .then(orders => {
            res.render('shop/order', {
                orders: orders,
                pageTitle: 'Orders',
                page: 'orders'
            });
        })
        .catch(err => console.log(err));
}

exports.postCreateOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.qty
                        }
                        return product;
                    }));
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(() => {
            console.log('Successfully created orders...');
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        page: 'checkout'
    });
}

exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}