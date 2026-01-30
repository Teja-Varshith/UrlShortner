import { verifyJwt } from "../utils/verifyJWT.js";


/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */


export function  authenticationMiddleware(req, res, next) {
    console.log("uggv");
    const authHeader = req.headers['authorization'];

    console.log(authHeader);

    if(!authHeader) return next();


    console.log("iyvyg");
        
    
    if(!authHeader.startsWith('Bearer ')){
        return res.status(400).json({error : "header is required"});
    }

    const [_,token] = authHeader.split(' ');

    const payload = verifyJwt(token);

    console.log("uigyfyf");

    req.user = payload;
    next();
}

