const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProducts);

router.post('/add-product', adminController.postAddProducts);

router.get('/products', adminController.getAdminProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/update-product', adminController.postUpdateProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;