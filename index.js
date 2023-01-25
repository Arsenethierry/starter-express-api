const express = require('express')
const products = require('./products');
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
});

app.get('/products', (req, res) => {
    res.send(products);
})
app.listen(process.env.PORT || 3000)