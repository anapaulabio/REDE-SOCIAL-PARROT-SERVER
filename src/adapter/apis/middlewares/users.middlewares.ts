import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { validate, Joi} from 'express-validation';
import { auth } from '../../../infrastructure/config/database.config';


import loginUserUsecase from '../../../domain/usecases/users/login.user.usecase';
import readUserUsecase from '../../../domain/usecases/users/read.user.usecase';


export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

class UsersMiddleware {
  /*  async auth(req: Request, res: Response, next: NextFunction) {
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
*/
    async validatePassword( req: Request, res: Response, next: NextFunction){
        try { //só funciona no controller
            const user = await loginUserUsecase.execute(req.body)
            let isMacth = bcrypt.compareSync(req.body.password, user.password)

            if (!user) {
                res.status(401).send("Senha ou email inválido, tente novamente")
            } 
            
            if (!isMacth) {
                res.status(401).send("Senha ou email inválido, tente novamente")
            }
            const token = jwt.sign({
                indexId: user.indexId,
                name: user.name,
                email: user.email
            },
                auth.key)
            console.log(token)

            next()
        } catch (err) {
            return res.status(500).send("Deu ruim")
        }
    }

    async valitateUserExists( req: Request, res: Response, next: NextFunction){
        try {
            let user = await readUserUsecase.execute({
                UserId: Number(req.params.UserId)
            })
    
            if (!user) {
                res.status(401).send("Usuário não encontrado")
            } 

            next()
        } catch (error) {
            return res.status(500).send("Deu ruim")
        }
    }
    
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