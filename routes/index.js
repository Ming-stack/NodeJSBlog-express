var express = require('express')
var router = express.Router()
var Article = require('../models/article')
var Categories = require('../models/categories')
var userController = require('../controller/user')

router.get('/', (req, res) => {
    Article.find((err, docs) => {
        Categories.find((err, docs2)=> {
            Article.count().then(count => {
                res.render('index', {
                    list: docs.slice((req.query.page - 1) * 4, req.query.page * 4),
                    categories: docs2,
                    count,
                    currentPage: req.query.page || 1
                });
            })
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