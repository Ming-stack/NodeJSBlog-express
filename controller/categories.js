const config = require('../config');
const Categories = require('../models/categories')

module.exports = {
    add(req, res, next) {
        const data = new Categories(req.body);
        data.save().then((doc) => {
            // 6076d0454f8b2a2ac0fdcfe7
            res.send({...config.ok, result:doc})
        })
            .catch((err) => { next(err) })
    },
    del(req, res, next) {
        Categories.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                res.send(config.no)
            } else {
                res.send(config.ok)
            }
        })
    },
    edit(req, res, next) { },
    find(req, res) {
        Categories.find((err, docs) => {
            res.send({ ...config.ok, data: docs })
        })
    }
}