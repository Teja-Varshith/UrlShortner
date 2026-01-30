import express from "express";
import { urlValidation } from "../validation/user.schema.validation.js";
import {db} from "../db/index.js";
import {nanoid} from "nanoid";

import { urlTable } from "../models/url.model.js";
import { eq } from "drizzle-orm";

const Urlrouter = express.Router();


Urlrouter.post("/shorten", async(req, res) => {
    const userId = req.user?.id;
    console.log(userId);
    if(!userId){
        return res.status(401).json({error : "Login kar bhai"});
    }

    const validationResult = await urlValidation.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            "error": validationResult.error.message
        });
    }

    const {url, shortCode} = validationResult.data;


    const [result] = await db.insert(urlTable).values({
        shortCode: shortCode ?? nanoid(7),
        targetUrl: url,
        userId
    })
    .returning({
        id: urlTable.id,
        shortCode: urlTable.shortCode,
        targetUrl: urlTable.targetUrl
    })

    return res.status(201).json({id: result.id, shortCode: result.shortCode, targetUrl: result.targetUrl});



    
});


Urlrouter.get("/:code", async(req,res) => {
    const code = req.params.code;
    const [urlll] = await db.select({
        targetUrl: urlTable.targetUrl
    })
    .from(urlTable)
    .where(eq(urlTable.shortCode,code));


    if(!urlll){
        res.status(404).json({error : "not found"});
    }

    return res.redirect(urlll.targetUrl);


})

export default Urlrouter;