const express = require('express');
//const router = express.Router();

const router = require('express-promise-router')();

const CatController = require('../controllers/categories');

router.route('/')
.get(CatController.index)
.post(CatController.newCategory);

router.route('/:categoryId')
.get(CatController.getCategory)
.patch(CatController.replaceCategory);  


router.route('/:categoryId/products')
  .get(CatController.getCatProd)
  .post(CatController.newCatProd);

module.exports = router;  