const PORT = process.env.PORT || 7005;
const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const axios = require('axios');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

app.use(express.static(path.resolve(__dirname, '../akwa-app/build')));

////GET Products Categories////
app.get('/categories/list', async (req, res) => {
    res.send(
    [
        {
            id: 1,
            cateName: "clothing"
        },
        {
            id:2,
            cateName: "shoes"
        },
        {
            id:3,
            cateName: "bestsellers"
        }
    ]
    )
})


// GET Products List ///
app.get(`/products/list/:gender/:categorie`, async (req, res) => {
    const { gender } = req.params;
    const { categorie } = req.params;


    axios.get(`https://www.theoutnet.com/en-us/shop/${gender}/${categorie}`)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            const Products = []
            $('.ProductItem24__p').map((i, el) => {
                const productId = $(el).find('.ProductItem24__details.ProductItem24__details--brief').attr('data-product-id');
                const name = $(el).find('.ProductItem24__name').text();
                const brandName = $(el).find('.ProductItem24__designer').text();
                const redPrice = $(el).find('span[content]').text();
                const whitePrice = $(el).find('.PriceWithSchema9__wasPrice').text();
                const discount = $(el).find('.PriceWithSchema9__discount.PriceWithSchema9__discount--sale').text();
                const imageUrl = $(el).find('img').attr('src');
                const imageSecond = $(el).find('.DoubleImage18.secondaryImage img').attr('src');
                Products.push({
                    productId,
                    name,
                    brandName,
                    redPrice,
                    whitePrice,
                    discount,
                    imageUrl,
                    imageSecond
                })
            })
            res.json(Products)
        })
})

//// Get products list for women ///
app.get(`/products/list/:categorie`, async (req, res) => {
    const { categorie } = req.params;


    axios.get(`https://www.theoutnet.com/en-us/shop/${categorie}`)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            const Products = []
            $('.ProductItem24__p').map((i, el) => {
                const productId = $(el).find('.ProductItem24__details.ProductItem24__details--brief').attr('data-product-id');
                const name = $(el).find('.ProductItem24__name').text();
                const brandName = $(el).find('.ProductItem24__designer').text();
                const redPrice = $(el).find('span[content]').text();
                const whitePrice = $(el).find('.PriceWithSchema9__wasPrice').text();
                const discount = $(el).find('.PriceWithSchema9__discount.PriceWithSchema9__discount--sale').text();
                const imageUrl = $(el).find('img').attr('src');
                const imageSecond = $(el).find('.DoubleImage18.secondaryImage img').attr('src');
                Products.push({
                    productId,
                    name,
                    brandName,
                    redPrice,
                    whitePrice,
                    discount,
                    imageUrl,
                    imageSecond
                })
            })
            res.json(Products)
        })
})

/// Products Details ///
app.get('/products/detail/:productId', async (req, res) => {
    const { productId } = req.params;

    axios.get(`https://www.theoutnet.com/en-us/shop/product/${productId}`)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            const Products = []
            $('.ProductDetailsPage86__wrapper').map((i, el) => {
                const name = $(el).find('.ProductInformation86__name').text();
                const brandName = $(el).find('.ProductInformation86__designer span').text();
                const redPrice = $(el).find('.PriceWithSchema9__value.PriceWithSchema9__value--sale.PriceWithSchema9__value--details span').text();
                const whitePrice = $(el).find('.PriceWithSchema9__discountContainer s').text();
                const discount = $(el).find('div.PriceWithSchema9__discount.PriceWithSchema9__discount--sale.PriceWithSchema9__discount--details').text();
                const imageUrl1 = $(el).find('div.ImageCarousel86__thumbnails:nth-child(1) img').attr('src');
                const SizeOne = $(el).find('ul.GridSelect11 li:nth-child(1) .GridSelect11__optionBox').text();
                const SizeTwo = $(el).find('.GridSelect11 li:nth-child(2) .GridSelect11__optionBox').text();
                const SizeThree = $(el).find('.GridSelect11 li:nth-child(3) .GridSelect11__optionBox').text();
                const SizeFour = $(el).find('.GridSelect11 li:nth-child(4) .GridSelect11__optionBox').text();
                const SizeFive = $(el).find('.GridSelect11 li:nth-child(5) .GridSelect11__optionBox').text();
                const AllSize = [];
                AllSize.push({ SizeOne, SizeTwo, SizeThree, SizeFour, SizeFive });
                Products.push({
                    name,
                    brandName,
                    redPrice,
                    whitePrice,
                    discount,
                    imageUrl1,
                    AllSize
                })
            })
            res.json(Products)
        })
})

///GET Products List types ///
app.get('/products/list/:gender/:cate/:type', async (req, res) => {
    const { gender } = req.params;
    const { cate } = req.params;
    const { type } = req.params;


    axios.get(`https://www.theoutnet.com/en-us/shop/${gender}/${cate}/${type}`)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            const Products = [];
            $('.ProductItem24__p').map((i, el) => {
                const productId = $(el).find('.ProductItem24__details.ProductItem24__details--brief').attr('data-product-id');
                const name = $(el).find('.ProductItem24__name').text()
                const brandName = $(el).find('.ProductItem24__designer').text();
                const redPrice = $(el).find('span[content]').text();
                const whitePrice = $(el).find('.PriceWithSchema9__wasPrice').text();
                const discount = $(el).find('.PriceWithSchema9__discount.PriceWithSchema9__discount--sale').text();
                const imageUrl = $(el).find('img').attr('src');
                const imageSecond = $(el).find('.DoubleImage18.secondaryImage img').attr('src');
                Products.push({
                    productId,
                    name,
                    brandName,
                    redPrice,
                    whitePrice,
                    discount,
                    imageUrl,
                    imageSecond
                })
            })
            res.json(Products)
        })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../akwa-app/build', 'index.html'));
  });

app.listen(PORT, () => console.log(`start running on port ${PORT}`));
