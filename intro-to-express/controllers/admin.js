const Products = require('../models/product');
const db = require('../utility/database');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        page: 'add-products',
        editing: false
    });
}

exports.postAddProducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const products = new Products(null, title, imageUrl, price, description);
    products.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
}

exports.getAdminProducts = (req, res, next) => {
    Products.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('admin/products', {
                products: rows,
                pageTitle: 'Admin Products',
                page: 'admin-products'
            });
        })
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    Products.findById(req.params.productId, product => {
        res.render('admin/edit-product', {
            product: product,
            pageTitle: 'Edit Product',
            page: 'edit-products',
            editing: true
        });
    });
}

exports.postUpdateProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Products(prodId, title, imageUrl, price, description);
    product.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Products.deleteById(prodId);
    res.redirect('/admin/products');
}