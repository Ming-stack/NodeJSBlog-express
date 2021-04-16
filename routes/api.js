var express = require('express')
var router = express.Router()
const userController = require('../controller/user')
const categoriesController = require('../controller/categories')
const articleController = require('../controller/article')
const uploadController = require('../controller/upload')

router
    .post('/login', userController.login)
    .get('/logout', userController.logout)
    .post('/register', userController.register)
    .post('/categories', categoriesController.add)
    .get('/categories', categoriesController.find)
    .delete('/categories/:id', categoriesController.del)
    .post('/article', articleController.add)
    .get('/article', articleController.find)
    .delete('/article/:id', articleController.del)
    .post('/upload/img', uploadController.img)
module.exports = router