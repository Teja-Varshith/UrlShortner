import { verifyJwt } from "../utils/verifyJWT.js";


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */


function authenticationMiddleware(req, res, next) {
    const authHeader = req.header['authorization'];

    if(!authHeader) return next();
        
    
    if(!authHeader.startsWith('Bearer')){
        return res.status(400).json({error : "header is required"});
    }

    const [_,token] = authHeader.split(' ');

    const payload = verifyJwt(token);

    req.user = payload;
    next();
}

export default authenticationMiddleware;