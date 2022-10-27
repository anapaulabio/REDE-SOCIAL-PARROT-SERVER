import { CommonRoutesConfig } from "./common.routes.config";
import express from "express";
import postController from "../controllers/post.controller"
import postMiddleware from "../middlewares/post.middleware";


export class PostRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PostsRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/post`)
            .get(
                postMiddleware.authJWT,
                postController.listPosts,
                );
        this.app.route(`/post`)
            .post( 
                postMiddleware.authJWT,
                postMiddleware.validateRegister,
                postController.createPosts 
            );

         /*   this.app.route('/post/:PostId')
            .all(postMiddleware.validateGetById,
                postMiddleware.authJWT)
            .get(postController.getPostById)
            .put(postController.updatePosts);

            this.app.route('/users/posts/:UserId')
                .get(
                    postMiddleware.authJWT,
                    postController.postsByIdUser
                    );

            this.app.use(postMiddleware.validateError);*/

         
                this.app.route(`/user/post`)
                    .get(
                        postController.postByUser
                    );
        
                return this.app;

           
    }
}