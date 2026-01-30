import { createHmac, randomBytes } from "node:crypto";

export function createHash(password, userSalt = undefined) {
    const salt = userSalt ?? randomBytes(256).toString('hex');
    const hashedpass = createHmac('sha256', salt).update(password).digest('hex');

    return {salt, password: hashedpass};
}