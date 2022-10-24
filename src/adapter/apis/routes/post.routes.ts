import { CommonRoutesConfig } from "./common.routes.config";
import PostController from "../controller/post.controller";
import express from "express";
import postController from "../controller/post.controller";

export class AccountsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PostsRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/post`)
            .get(postController.listPosts)
            .post( postController.createPosts
                
            );
            return this.app;

            }}