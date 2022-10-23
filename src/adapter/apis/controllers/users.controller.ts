import express from 'express';
import debug from 'debug';

import createUserUsecase from '../../../domain/usecases/user/create.user.usecase';
import listUserUsecase from '../../../domain/usecases/user/list.user.usecase';
import updateUserUsecase from '../../../domain/usecases/user/update.user.usecase';
import deleteUserUsecase from '../../../domain/usecases/user/delete.user.usecase';
import readUserUsecase from '../../../domain/usecases/user/read.user.usecase';

const log: debug.Debugger = debug('app: users-controller')

class UsersController {
    async getUsers(req: express.Request, res: express.Response){
        const users = await listUserUsecase.execute()
        res.status(200).send(users)
    }

    async getUsersById(req: express.Request, res: express.Response){
        const user = await readUserUsecase.execute({
            UserId: Number(req.params.UserId)
        })
        res.status(200).send(user)
    }

    async createUsers(req: express.Request, res: express.Response){
        const user = await createUserUsecase.execute(req.body)
        log(user)
        res.status(201).send(user)
    }

    async updateUsers(req: express.Request, res: express.Response){
        let user = await readUserUsecase.execute({
            UserId: Number(req.params.UserId)
        })
        if(!user){
           res.status(401).send("Usuário não encontrado")
        } else {
            user = await updateUserUsecase.execute(req.body)
        }         
        res.status(200).send(user)
    }

    async removeUsers(req: express.Request, res: express.Response){
        const user = await deleteUserUsecase.execute({
            UserId: Number(req.params.UserId)
        })
        res.status(204).send()
    }
}

export default new UsersController();