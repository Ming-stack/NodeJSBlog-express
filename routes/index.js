var express = require('express')
var router = express.Router()
var Article = require('../models/article')
var Categories = require('../models/categories')
var userController = require('../controller/user')

router.get('/', (req, res) => {
    Article.find((err, docs) => {
        Categories.find((err, docs2)=> {
            res.render('index', {
                list: docs,
                categories: docs2
            });
        })
    }).populate('categories')
})
router.get('/detail/:id', (req, res) => {
    Article.findById(req.params.id, (err, docs) => {
        res.render('detail', {
            data: docs
        });
    })
})
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register');
})

module.exports = router