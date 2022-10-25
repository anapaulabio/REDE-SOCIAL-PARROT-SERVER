import express from 'express';
import SECRET_KEY from "../../../infrastructure/config/secret.config";

import { expressjwt, Request as JWTRequest } from "express-jwt";
// também não autoriza
function authJWT(req: JWTRequest, res: express.Response) {
    expressjwt({
        secret: SECRET_KEY,
        algorithms: ["HS256"]
    })

    if (!req.auth?.admin) return res.sendStatus(401);
    res.sendStatus(200);
}

export default authJWT
