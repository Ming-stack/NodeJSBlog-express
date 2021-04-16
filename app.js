const express = require('express')
const app = express()
const expressJwt = require('express-jwt');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
    
const routes = {
    admin: require('./routes/admin'),
    index: require('./routes/index'),
    api: require('./routes/api'),
};

const config = {
    jwt: require('./config/jwt'),
    err: require('./config/err'),
    db: require('./config/db'),
    base: require('./config/index'),
};
app.use(cookieParser())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true
}));
app.use(expressJwt({
    secret: 'shhhhhhared-secret', algorithms: ['HS256'],
    getToken: function fromHeaderOrQuerystring(req) {
        return req.cookies.token;
    }   
}).unless({ path: [/\/(api|static|login|register)/, '/', /\/details*/] }));
app.set('view engine', 'ejs')
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/admin', routes.admin);
app.use('/api', routes.api);
app.use('/', routes.index);
app.use(config.err.error)
app.listen(3030, () => console.log('http://localhost:3030'))
mongoose.connect(
    config.base.mongodbUrl,
    config.db.mongodb,
    (err) => err && console.log(err)
);