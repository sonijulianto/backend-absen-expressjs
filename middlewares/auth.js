const jwt = require("jsonwebtoken")

class Auth {
    static auth = async (req, res, next)=> {
        if(!req.header('Authorization')) return res.status(401).json({
            status: 'failed',
            message: 'Forbidden'
        })
        const verify = await jwt.sign(token, secret, (err, dec)=> {
            if(err) {
                return res
            }
        })
    }
}