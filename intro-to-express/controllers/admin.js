const Products = require('../models/product');

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
    const products = new Products(title, imageUrl, price, description);
    products.save();
    res.redirect('/');
}

exports.getAdminProducts = (req, res, next) => {
    Products.fetchAll(products => {
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            page: 'admin-products'
        });
    })
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
