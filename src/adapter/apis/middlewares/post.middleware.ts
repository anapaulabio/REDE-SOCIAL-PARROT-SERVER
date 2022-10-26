import express from 'express';
import secret from "../../../infrastructure/config/secret.config";
import jwt  from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import { Joi, validate, ValidationError } from 'express-validation';
// também não autoriza

export interface CustomRequest extends express.Request {
    token: string | JwtPayload;
}

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
    async validateRequiredPostBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if (req.body && req.body.userid !== undefined) {
            next();
        } else {
            res.status(400).send({error: `Verifique os campos obrigatórios para criar uma conta.`});
        }
    }

    authJWT(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const token = req.headers.authorization?.replace('Baerer', '')
            console.log(token)
            if (!token) {
                console.error('deu ruim')
              }
        
              const decoded = jwt.verify(token!, secret);
            (req as CustomRequest).token = decoded;
          
            next()
        
        } catch (error) {
            res.status(401).send('Please authenticate');
        }
    }
   
    async validateError (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err)
        }
        if (err.name === "UnauthorizedError") {
          res.status(401).send("invalid token...");
        } else {
          next(err);
        }
      }
}

export default new PostMiddleware()