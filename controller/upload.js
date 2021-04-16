const config = require('../config')
const path = require('path')
module.exports = {
    img(req, res) {
        var sampleFile = req.files.file;
        sampleFile.mv(path.join(config.root,'../public/static/upload/',sampleFile.name), function (err) {
            if (err)
                return res.status(500).send(err);
            res.send({
                url: '/static/upload/'+sampleFile.name
            });
        });
    }
}