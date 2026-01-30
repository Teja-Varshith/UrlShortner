import * as z from "zod";


export const loginValidation = z.object({
    email: z.email(),
    password: z.string().min(4)
});


export const urlValidation = z.object({
    url: z.url(),
    shortCode: z.string().optional()
});




export const signUpValidation = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(4)
});
