import express from 'express';
import bcrypt from 'bcrypt';
import { validate, Joi, ValidationError } from 'express-validation';
import jwt, { JwtPayload } from 'jsonwebtoken';

import SECRET_KEY from '../../../infrastructure/config/secret.config';
import logger from '../../../infrastructure/logs/winston.logs';
import loginUserUsecase from '../../../domain/usecases/users/login.user.usecase';
import readUserUsecase from '../../../domain/usecases/users/read.user.usecase';


export interface CustomRequest extends express.Request {
    token: string | JwtPayload;
}

class UsersMiddleware {
    //Não autoriza 
    /* async auth(req: express.Request, res: express.Response, next: express.NextFunction) {
              const token = req.header('Authorization')?.replace('Bearer ', '');
  
            if (token) {
              const decoded = jwt.verify(token, SECRET_KEY);
              (req as CustomRequest).token = decoded;
  
              next()
            }
            else {
              res.status(401).send('Please authenticate');
          }
      }*/
  

    registerValidation = validate({
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            apartment: Joi.number().required(),
            password: Joi.string().min(8).required(),
            linkdafoto: Joi.string().required()
        })
    })


    loginValidation = validate({
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
    })

    getByIdValidation = validate({
        params: Joi.object({
            UserId: Joi.number().required(),
        })
    })

    updateValidation = validate({
        body: Joi.object({
            indexId: Joi.number().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            apartment: Joi.number().required(),
            password: Joi.string().min(8).required(),
            linkdafoto: Joi.string().required()
        }),
    })

    async validateEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await loginUserUsecase.execute(req.body)

        if (user) {
            logger.info(["email encontrado"])
            next()
        } else {
            logger.error(["email invalido"])
            res.status(401).send("Senha ou email inválido, tente novamente")
        }
    }

    async validatePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await loginUserUsecase.execute(req.body)
        let isMatch = bcrypt.compareSync(req.body.password, user.password)

        if (isMatch) {
            logger.info(["Senha compatível"])
            next()
        } else {
            logger.error(["senha inválida"])
            res.status(401).send("Senha ou email inválido, tente novamente")
        }
    }

    async valitateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        let user = await readUserUsecase.execute({
            UserId: Number(req.params.UserId)
        })
        if (user) {
            logger.info(["Usuario encontrado: ", user])
            next()
        } else {
            logger.error(["Usuario não encontrado"])
            res.status(404).send("Usuário não encontrado")
        }
    }

    async validateError(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        if (err instanceof ValidationError) {
            return res.status(err.statusCode).json(err)
        }

        return res.status(500).json(err);
    }
}

export default new UsersMiddleware()