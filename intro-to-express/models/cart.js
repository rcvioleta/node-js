const fs = require('fs');
const path = require('path');

const file = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // fetch previous cart
        fs.readFile(file, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) cart = JSON.parse(fileContent);
            
            // analyze the cart => finding existing product
            const existingProductIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products.find(p => p.id === id);
            let updatedProduct;

            // add new product / increase quantity
            if (existingProduct) {
                // existing product
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;    
                cart.products = [ ...cart.products ];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                // new product
                updatedProduct = { id: id, qty: 1 };
                cart.products = [ ...cart.products, updatedProduct ];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(file, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }

    static getCart(callback) {
        fs.readFile(file, (err, fileContent) => {
            const cartProducts = JSON.parse(fileContent);
            callback(cartProducts);
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(file, (err, fileContent) => {
            if (err) return;
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) return;
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;
            fs.writeFile(file, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        });
    }
}