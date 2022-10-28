import express from 'express';
import bcrypt from 'bcrypt';
import { validate, Joi, ValidationError } from 'express-validation';

import logger from '../../../infrastructure/logs/winston.logs';
import loginUserUsecase from '../../../domain/usecases/authentication/login.user.usecase';
import readUserUsecase from '../../../domain/usecases/users/read.user.usecase';
import constantsConfig from '../../../infrastructure/config/constants.config';

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

    async validateEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await loginUserUsecase.execute(req.body)

        if (user) {
            logger.info(["email encontrado"])
            next()
        } else {
            logger.error(["email invalido"])
            res.status(401).send({ERROR: constantsConfig.USERS.MESSAGES.ERROR.INVALID_EMAIL})
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
            res.status(401).send({ERROR: constantsConfig.USERS.MESSAGES.ERROR.INVALID_PASS})
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
            res.status(404).send({ERROR: constantsConfig.USERS.MESSAGES.ERROR.USER_NOT_EXIST.replace('{USER_ID}', req.params.UserId)})
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