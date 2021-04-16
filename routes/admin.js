var express = require('express')
var router = express.Router()
var Categories = require('../models/categories')
var Article = require('../models/article')

router.get('/', (req, res) => {
    res.render('admin/admin');
})
router.get('/categories_add', (req, res) => {
    res.render('admin/categories_add');
})
router.get('/categories_find', (req, res) => {
    Categories.find((err, docs) => {
        res.render('admin/categories_find', {
            list: docs
        });
    })
})
router.get('/article_add', (req, res) => {
    res.render('admin/article_add');
})
router.get('/article_find', (req, res) => {
    Article.find((err, docs) => {
        res.render('admin/article_find', {
            list: docs
        });
    }).populate('categories')
})
module.exports = router