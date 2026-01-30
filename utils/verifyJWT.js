import jwt from "jsonwebtoken";

export function verifyJwt(token) {
    try{
        const payload =jwt.verify(token, process.env.JWT_SECRET);
        return payload;
    }catch{
        return null;
    }


}