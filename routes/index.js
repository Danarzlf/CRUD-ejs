const router = require('express').Router();

const productController = require('../controller/productController');

//API
router.get('/products', productController.getProducts)

router.get('/products/search', productController.searchProduct)

router.get('/api/products/:id', productController.getProductById)

router.put('/products/:id', productController.editProduct)

router.delete('/products/:id', productController.deleteProduct)

router.post('/api/products', productController.createProduct)


//DASHBOARD
module.exports = router
