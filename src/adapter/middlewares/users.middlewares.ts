import * as Sequelize from 'sequelize';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { validate, Joi} from 'express-validation';
import { auth } from '../../infrastructure/config/database.config';


import loginUserUsecase from '../../domain/usecases/users/login.user.usecase';


export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

class UsersMiddleware {
    async auth(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');

            if (!token) {
                throw new Error();
            }

            const decoded = jwt.verify(token, auth.key);
            (req as CustomRequest).token = decoded;

            next();
        } catch (err) {
            res.status(401).send('Please authenticate');
        }
    }

    async validatePassword( req: Request, res: Response, next: NextFunction){
        try { //não está funcionando
            const user = await loginUserUsecase.execute(req.body.email)

            if (!user){
                return res.status(401).send("E-mail ou senha inválido, verifique e tente novamente");
            }

            if(!bcrypt.compareSync(req.body.password, user.password)){
                return res.status(401).send("E-mail ou senha inválido, verifique e tente novamente");
            }
            next()
        } catch (err) {
            return res.status(500).send("Deu ruim")
        }
    };
    
    registerValidation = validate({
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            apartment: Joi.number().required(),
            password: Joi.string().min(8).required(),
            linkdafoto: Joi.string().required()
        })
    });

    loginValidation = validate({
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
    });

}

export default new UsersMiddleware()