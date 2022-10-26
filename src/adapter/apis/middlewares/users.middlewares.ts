import express from 'express';
import bcrypt from 'bcrypt';
import { validate, Joi, ValidationError } from 'express-validation';
import jwt, { JwtPayload } from 'jsonwebtoken';

import SECRET_KEY from '../../../infrastructure/config/secret.config';
import logger from '../../../infrastructure/logs/winston.logs';
import loginUserUsecase from '../../../domain/usecases/users/login.user.usecase';
import readUserUsecase from '../../../domain/usecases/users/read.user.usecase';
import usersController from '../controllers/users.controller';

export interface CustomRequest extends express.Request {
    token: string | JwtPayload;
}
class UsersMiddleware {

    validateRegister = validate({
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            apartment: Joi.number().required(),
            password: Joi.string().min(8).required(),
            linkdafoto: Joi.string().required()
        })
    })


    validateLogin = validate({
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
    })

    validateGetById = validate({
        params: Joi.object({
            UserId: Joi.number().required(),
        })
    })

    validateUpdate = validate({
        body: Joi.object({
            indexId: Joi.number().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            apartment: Joi.number().required(),
            password: Joi.string().min(8).required(),
            linkdafoto: Joi.string().required()
        }),
    })

    

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