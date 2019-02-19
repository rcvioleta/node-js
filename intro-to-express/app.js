const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errController = require('./controllers/error');

const app = express();

const sequelize = require('./utility/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errController.get404);

sequelize.sync()
    .then(() => app.listen(3000))
    .catch(err => console.log(err));