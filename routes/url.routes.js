import express from "express";
import { urlValidation } from "../validation/user.schema.validation.js";
import {db} from "../db/index.js";
import { urlTable } from "../models/url.model.js";

const Urlrouter = express.Router();

Urlrouter.post("/shorten", async(req, res) => {
    const userId = req.user?.id;
    console.log(userId);
    // if(!userId){
    //     return res.status(401).json({error : "Login kar bhai"});
    // }

    const validationResult = await urlValidation.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            "error": validationResult.error.message
        });
    }

    const {url, shortCode} = validationResult.data;


    const [result] = await db.insert(urlTable).values({
        shortCode,
        targetUrl: url,
    })
    .returning({
        id: urlTable.id,
        shortCode: urlTable.shortCode,
        targetUrl: urlTable.targetUrl
    })

    return res.status(201).json({id: result.id, shortCode: result.shortCode, targetUrl: result.targetUrl});



    
});

export default Urlrouter;