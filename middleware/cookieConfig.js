module.exports = function (req, res, next) {
    // req.cookies= new Cookies(req,res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.userInfo) {
        try {
            req.userInfo = JSON.parse(JSON.stringify(req.cookies.userInfo));
            //获取当前用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            });

        } catch (e) {
            console.log('cookie验证出错');
            next();
        }
    } else {
        console.log('不存在cookie');
        next();
    }
}