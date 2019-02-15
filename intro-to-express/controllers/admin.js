const Products = require('../models/product');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        page: 'add-products'
    });
}

exports.postAddProducts = (req, res, next) => {
    const products = new Products(req.body.title);
    products.save();
    res.redirect('/');
}

exports.getAdminProducts = (req, res, next) => {
    res.render('admin/products', {
        pageTitle: 'Admin Products',
        page: 'admin-products'
    });
}
