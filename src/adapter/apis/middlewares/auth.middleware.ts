import { expressjwt, Request as JWTRequest } from "express-jwt";
import express from 'express';
import secret from '../../../infrastructure/config/secret.config'
// retorna o erro "secret" is required for options
expressjwt({ secret: secret, algorithms: ["HS256"] }),
  function (req: JWTRequest, res: express.Response) {
    if (!req.auth?.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }


export default expressjwt
module.exports = expressjwt