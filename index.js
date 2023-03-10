const PORT = process.env.PORT || 3001;
const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const bodyParser = require('body-parser')
const list = require('./List.json')
const Categories = require('./Categories.json')
const detail = require('./Details.json')
const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '500mb',parmeterlimit: 100000, extended: true }))
app.use(bodyParser.urlencoded({ limit: '500mb',parmeterlimit: 100000, extended: true }))
app.use(cors());

mongoose.connect(process.env.MOGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("conected"))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

/// Products Details ///
/////////////////
//////////////////////////////////////////////////////
///
//
//// GET Products List Men ///
app.get('/products/list/men/clothing', async (req, res) => {
    res.json(list.clothingMen);
})
app.get('/products/list/men/shoes', async (req, res) => {
    res.json(list.shoesMen);
})
app.get('/products/list/men/bestsellers', async (req, res) => {
    res.json(list.bestSellersMen);
})

//////GET Products List for women ////
app.get('/products/list/women/clothing', async (req, res) => {
    res.json(list.clothingWomen);
})
app.get('/products/list/women/shoes', async (req, res) => {
    res.json(list.shoesWomen);
})
app.get('/products/list/women/bestsellers', async (req, res) => {
    res.json(list.bestSellersWomen);
})
////Gategorie (jackets/shorts/pants/jeans) Men///
app.get('/products/list/men/jackets', async (req, res) => {
    res.json(Categories.jacketsMen);
})
//
app.get('/products/list/men/shorts', async (req, res) => {
    res.json(Categories.shortsMen);
})
//
app.get('/products/list/men/pants', async (req, res) => {
    res.json(Categories.pantsMen);
})
//
app.get('/products/list/men/jeans', async (req, res) => {
    res.json(Categories.jeansMen);
})
////Gategorei (jackets/dresses/pants/jeans) Women///
app.get('/products/list/women/jackets', async (req, res) => {
    res.json(Categories.jacketsWomen);
})
//
app.get('/products/list/women/dresses', async (req, res) => {
    res.json(Categories.dressesWomen);
})
//
app.get('/products/list/women/pants', async (req, res) => {
    res.json(Categories.pantsWomen);
})
//
app.get('/products/list/women/jeans', async (req, res) => {
    res.json(Categories.jeansWomen);
})

////detail products
app.get('/products/details/:id', async (req, res) => {
    const id = req.params;
    
    detail.map((el) => {
        res.json(el[id.id])
    })
})

app.listen(PORT, () => console.log(`start running on port ${PORT}`));
