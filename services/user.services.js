import db from '../db/index.js';
import { userTable } from '../models/user.model.js';
import {eq} from "drizzle-orm";

export async function getExsistingUser(email) {
    const exsistingUser = await db.select({
            id: userTable.id,
            firstName: userTable.firstName,
            lastName: userTable.lastName,
            email: userTable.email,
            salt: userTable.salt,
            password: userTable.password

        })
        .from(userTable)
        .where(eq(userTable.email,email));

    return exsistingUser;
}

export async function insertUserData(email,firstName,lastName,salt,hashedpass) {
    const user = await db.insert(userTable).values({
            email,
            firstName,
            lastName,
            salt,
            password: hashedpass
        }).returning({id: userTable.id});
    return user;
}