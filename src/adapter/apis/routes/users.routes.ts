import express from 'express';
import { CommonRoutesConfig } from "./common.routes.config";
import usersController from '../controllers/users.controller';


export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application){
      super(app, 'UsersRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route('/users')
            .get(usersController.getUsers)
        
        this.app.route('/cadastro')
            .post(usersController.createUsers)
        
        this.app.route('/login')
           .post(usersController.loginOne)
    
        this.app.route('/users/:UserId')
            .get(usersController.getUsersById)
            .put(usersController.updateUsers)
            .delete(usersController.removeUsers)
            
    
        return this.app
    } 
}

