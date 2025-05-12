const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

// Create a new product
router.post('/', upload.array('images', 5), productController.createProduct);

// Get all products
router.get('/', productController.getProducts);

module.exports = router;