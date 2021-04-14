const User = require('../models/User')
const config = require('../config');
var Cookies = require('cookies')
var keys = ['keyboard cat']

module.exports = {
    logout(req, res, next) {
        var cookies = new Cookies(req, res, { keys })
        cookies.set('token', '');
        res.redirect(301, '/admin')
    },
    register(req, res, next) {
        const data = new User(req.body);
        data.save()
            .then(() => {
                res.send(config.ok)
            })
            .catch((err) => { next(err) })
    },
    login(req, res, next) {
        if (!req.body.username || !req.body.password) {
            return res.send(config.no)
        }
        User
            .find(req.body)
            .then((arr) => {
                if (arr.length) {
                    var jwt = require('jsonwebtoken');
                    var cookies = new Cookies(req, res, { keys })

                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: arr[0]
                    }, 'shhhhhhared-secret');

                    cookies.set('token', token)

                    res.send({ ...config.ok })
                } else {
                    res.send(config.no)
                }
            })
            .catch((err) => { next(err) })
    }
}