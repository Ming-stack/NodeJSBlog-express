var express = require('express')
var router = express.Router()
var Article = require('../models/article')

router.get('/', (req, res) => {
    Article.find((err, docs) => {
        res.render('index', {
            list: docs
        });
    }).populate('categories')
})
router.get('/details/:id', (req, res) => {
    Article.findById(req.params.id, (err, docs) => {
        res.render('details', {
            data: docs
        });
    }).populate('categories')
})
router.get('/details', (req, res) => {
    res.render('details');
})
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register');
})

module.exports = router