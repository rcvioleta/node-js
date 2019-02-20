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
    req.user.createProduct({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            userId: req.user.id
        })
        .then(result => {
            console.log('Product Created');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.getAdminProducts = (req, res, next) => {
    req.user.getProducts()
        // Products.findAll()
        .then(products => {
            res.render('admin/products', {
                products: products,
                pageTitle: 'Admin Products',
                page: 'admin-products'
            });
        })
        .catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    req.user.getProducts({
            where: {
                id: prodId
            }
        })
        // Products.findById(prodId)
        .then(products => {
            const product = products[0];
            res.render('admin/edit-product', {
                product: product,
                pageTitle: `Edit ${product.title}`,
                page: 'edit-products',
                editing: true
            });
        })
        .catch(err => console.log(err));
}

exports.postUpdateProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Products.findById(prodId)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Products.findById(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Product Deleted');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
}