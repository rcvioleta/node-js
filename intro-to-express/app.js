const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errController = require('./controllers/error');

const app = express();

const sequelize = require('./utility/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errController.get404);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});


sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) return User.create({
            name: 'John Doe',
            email: 'johndoe@example.com'
        });
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => console.log(err));