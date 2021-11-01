const productController = require('../controllers/product.controller')
const chalk = require('chalk');
const express = require('express')
const router = new express.Router()
const error = chalk.bold.white.bgRed;

router.get('/filter', async (req, res) => {
    try {
        if (Object.keys(req.query).length != 0) {
            if(!(req.query.maxprice || req.query.size || req.query.highlight)){
                console.log(error('Error : Invalid keys'));
                return res.status(400).send({ error: 'Invalid keys!' })
            }
        }
        const response = await productController.filterProductList(req.query)
        res.send(response)
    } catch (e) {
        console.log(error('Error : Bad request found'));
        res.status(400).send({ error:'Bad request'})
    }
})

module.exports = router