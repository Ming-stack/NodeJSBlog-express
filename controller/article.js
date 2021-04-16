const config = require('../config');
const Article = require('../models/article')
const Joi = require('joi-oid')
const articleJoi = Joi.object({
  categories: Joi.objectId(),
  title: Joi.string(),
  content: Joi.string(),
  pubdate: Joi.string(),
  desc: Joi.string(),
  cover: Joi.string()
});

module.exports = {
    async add(req, res, next) {
        
        req.body.content = req.body.content.replace(/"/g, '\\"')
        try {
            await articleJoi.validateAsync(req.body);
        }
        catch (err) { 
            return res.send({code: 500, error: err.details[0].message})
        }
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