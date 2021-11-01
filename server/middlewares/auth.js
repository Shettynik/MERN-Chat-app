const jwt = require("jwt-then");

module.exports = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return res.status(401).json({message:"You are not authorized to access this route"});
        }

        const token = await req.headers.authorization.split(" ")[1];

        const payload = await jwt.verify(token, process.env.SECRET);
        if(!payload){
            return res.status(401).json({message:"You are not authorized to access this route"});
        }
        req.payload = payload;
        next()
        
    } catch (error) {
        res.status(401).json({error})
    }
}