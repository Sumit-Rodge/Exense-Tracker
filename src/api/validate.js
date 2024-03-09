const jwt = require('jsonwebtoken');

module.exports =  function(req,res,next){
    const token = req.cookies.auth-cookie;
    if(!token){
        res.sendStatus(401);
        console.log("cookie dosn't exist")
        return
    }

    try {
        const data = jwt.verify(token,process.env.SECRET_KEY);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}