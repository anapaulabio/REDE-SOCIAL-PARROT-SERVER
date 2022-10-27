import express from 'express';
import secret from "../../../infrastructure/config/secret.config";
import jwt  from 'jsonwebtoken'
import { IToken } from '../helpers/token.interface.helper';
import { Joi, validate, ValidationError } from 'express-validation';
import constantsConfig from '../../../infrastructure/config/constants.config';

class PostMiddleware {
    validateGetById = validate({
        params: Joi.object({
            PostId: Joi.number().required(),
        })
    })

    validateRegister = validate({
        body: Joi.object({
            userid: Joi.number().required(),
            contentText: Joi.string().required()
        })
    })

    authJWT(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const token = req.header('Authorization')?.replace('Baerer ', '')
            console.log(token)
            if (!token) {
                res.status(401).send({ERROR: constantsConfig.POSTS.MESSAGES.ERROR.TOKEN_REQUIRED})
              }
        
              const decoded = jwt.verify(token!, secret);
            (req as IToken).token = decoded;
            
          
            next()
        
        } catch (error) {
            res.status(401).send({ERROR: constantsConfig.POSTS.MESSAGES.ERROR.VERIFY_AUTH});
        }
    }
   
    async validateError (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err)
        }
        if (err.name === "UnauthorizedError") {
          res.status(401).send({ERROR: constantsConfig.POSTS.MESSAGES.ERROR.INVALID_TOKEN});
        } else {
          next(err);
        }
      }
}

export default new PostMiddleware()