module.exports = {
    error(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            // res.status(401).send('invalid token')
            res.redirect(302, '/login')
        } else {
            res.end(err);
        }
        next()
    }
}