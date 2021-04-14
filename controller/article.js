const config = require('../config');
const Article = require('../models/article')
// const Joi = require('joi-oid')
// const schema = Joi.object({
//   categories: Joi.objectId(),
//   title: Joi.string(),
//   content: Joi.number().min(18),
// });
// schema.validate({ 
//     title:'w' ,
//     content: true
// }).error.details[0].message
module.exports = {
    add(req, res, next) {
        req.body.content = req.body.content.replace(/"/g, '\\"')
        const data = new Article(req.body);
        data.save().then(() => {
            res.send(config.ok)
        })
            .catch((err) => { next(err) })
    },
    del(req, res, next) {
        Article.deleteOne({ _id: req.params.id }, (err) => {
            if (err) {
                res.send(config.no)
            } else {
                res.send(config.ok)
            }
        })
    },
    edit(req, res, next) { },
    find(req, res) {
        Article.find((err, docs) => {
            res.send({ ...config.ok, data: docs })
        }).populate('categories')
    }
}