const {User} = require('../models/User')
let auth = (req,res,next)=>{
    //쿠키에서 토큰을 가져온다.
    //토큰을 복호화 한후 유저를 찾는다.
    //유저가 있으면 okay.
    let token = req.cookies.x_auth;
    //custom method
    User.findByToken(token,(err,user)=>{
        if(err)
            throw err;
        if(!user)
            return res.json({isAuth:false, error:true});

        req.token = token
        req.user = user;
        next();
    });
}
module.exports = {auth};