import { CommonRoutesConfig } from "./common.routes.config";
import express from "express";
import postController from "../controllers/post.controller"
import postMiddleware from "../middlewares/post.middleware";
import authMiddleware from "../middlewares/auth.middleware";


export class PostRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PostsRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/post`)
            .get(postController.listPosts,
                
                )
        this.app.route(`/post`)
            .post( 
               // usersMiddlewares.auth,
                authMiddleware,
                postMiddleware.validateRegister,
                postController.createPosts 
            );

            this.app.route('/post/:PostId')
            .get(postMiddleware.validateGetById,
                postController.getPostById)
            .put(postController.updatePosts)

            this.app.use(postMiddleware.validateError);

            return this.app
    }
}