import express from "express";
import db from "../db/index.js";
import { userTable } from "../models/user.model.js";
import { createHmac, hash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import {signUpValidation,loginValidation} from "../validation/user.schema.validation.js";
import {getExsistingUser, insertUserData} from "../services/user.services.js";
import {createHash} from "../utils/hash.js";
import { email } from "zod";
import { error } from "node:console";
import jwt from "jsonwebtoken";

const router = express.Router();

 router.post("/logIn", async(req,res) => {
    const validationResult = await loginValidation.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            "error": validationResult.error.message
        });
    }

    const {email,password} = validationResult.data;

    const [user] = await getExsistingUser(email);

    if(!user){
       return res.
        status(404).
        json({"message": error.message});
    };

    const {password: hashedPass} = createHash(password,user.salt);

    if(hashedPass != user.password){
        return res.status(400).json({
            "error": hashedPass,
            "passwrd idd": user
        });
    };

    const token = jwt.sign({id: user.id},process.env.JWT_SECRET);



    return res.status(200).json(token);



 })

 router.post("/signUp", async(req,res) => {
    const validationResult = await signUpValidation.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            "error": validationResult.error.message
        });
    }

    const {firstName,lastName,password,email} = validationResult.data;

    const exsistingUser = await getExsistingUser(email);


    if(exsistingUser.length>0){
        return res.status(400).json({
            error : "user already exsists",
        });
    }

    const {salt,password: hashedpass} = createHash(password);

    const [user] = await insertUserData(email,firstName,lastName,salt,hashedpass);


    return res.status(201).json({
         data: {userId: user.id}
    });




 });





export default router;