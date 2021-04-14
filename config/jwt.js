module.exports = {
    // https://blog.csdn.net/weixin_41049850/article/details/80835092
    
    expressJwt: {
        secret: 'shhhhhhared-secret',
        credentialsRequired: false,
        algorithms: ['HS256'],
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1]
            } else if (req.query && req.query.token) {
                return req.query.token
            }
            return null
        }
    },
    unless: {
        path: ['/api', '/login', '/signup']  // 指定路径不经过 Token 解析
    }
}