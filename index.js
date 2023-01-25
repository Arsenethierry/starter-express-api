const express = require('express')
const products = require('./products');
const cors = require('cors');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const stripe = require("./routes/stripe");

const app = express()
require('dotenv').config()
app.use(cors());
app.use(express.json());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
});

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/stripe", stripe);

app.get('/products', (req, res) => {
    res.send(products);
})
const dburl = process.env.DB_URL

app.listen(process.env.PORT || 3000)

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("connected to mongoDb"))
.catch((error) => console.log(`error ${error}`))
