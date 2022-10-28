import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';

import secret from '../../../infrastructure/config/secret.config';
import { getErrorMessage } from '../helpers/errors.helper.adapter';

import createUserUsecase from '../../../domain/usecases/users/create.user.usecase';
import listUserUsecase from '../../../domain/usecases/users/list.user.usecase';
import updateUserUsecase from '../../../domain/usecases/users/update.user.usecase';
import deleteUserUsecase from '../../../domain/usecases/users/delete.user.usecase';
import readUserUsecase from '../../../domain/usecases/users/read.user.usecase';
import loginUserUsecase from '../../../domain/usecases/authentication/login.user.usecase';


const log: debug.Debugger = debug('app: users-controller')

class UsersController {
    async getUsers(req: express.Request, res: express.Response) {
        try {
            const users = await listUserUsecase.execute()
            
            res.status(200).send(users)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error)); 
        }
    }

    async getUsersById(req: express.Request, res: express.Response) {
        try {
            const user = await readUserUsecase.execute({
                UserId: Number(req.params.UserId)
            })
    
            res.status(200).send(user)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));    
        }
    }

    async createUsers(req: express.Request, res: express.Response) {
        try {
            const user = await createUserUsecase.execute(req.body)
            log(user)
            res.status(201).send(user)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));    
        }
    }

    async updateUsers(req: express.Request, res: express.Response) {
        try {
            let user = await updateUserUsecase.execute(req.body)

            res.status(200).send(user)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

    async removeUsers(req: express.Request, res: express.Response) {
        try {
            await deleteUserUsecase.execute({
                UserId: Number(req.params.UserId)
            })

            return res.status(204).send()
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

    async loginOne(req: express.Request, res: express.Response) {
        try {
            const user = await loginUserUsecase.execute(req.body)
            const token = jwt.sign({
                indexId: user.indexId,
                name: user.name,
                email: user.email,
                apartment: user.apartment
            },
                secret)

            return res.status(200).send({ data: user, token });
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }
}

export default new UsersController();