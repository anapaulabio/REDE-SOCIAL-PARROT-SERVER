import express from 'express';

import { CommonRoutesConfig } from "./common.routes.config";
import usersController from '../controllers/users.controller';
import usersMiddlewares from '../middlewares/users.middlewares';



export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route('/users')
            .get(usersController.getUsers);

        this.app.route('/cadastro')
            .post(
                usersMiddlewares.validateRegister,
                usersController.createUsers
            );

        this.app.route('/login')
            .post(
                usersMiddlewares.validateLogin,
                usersMiddlewares.validateEmail,
                usersMiddlewares.validatePassword,
                usersController.loginOne
            );

        this.app.route('/users/:UserId')
            .all(
                usersMiddlewares.validateGetById,
                usersMiddlewares.valitateUserExists
            )
            .get(usersController.getUsersById)
            .put(
                usersMiddlewares.validateUpdate,
                usersController.updateUsers
            )
            .delete(usersController.removeUsers);

        this.app.use(usersMiddlewares.validateError);

        return this.app
    }
}

