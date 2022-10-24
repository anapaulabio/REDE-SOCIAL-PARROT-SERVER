import express from 'express';
import createPostUsecase from '../../../domain/usecases/posts/create.post.usecase'
import listPostUsecase from '../../../domain/usecases/posts/list.post.usecase';
import debug from 'debug';


class PostMiddleware {
    async validateRequiredPostBodyFields(req: express.Request, res: express.Response, next: express.NextFunction){
        if (req.body && req.body.clientId !== undefined) {
            next();
        } else {
            res.status(400).send({error: `Verifique os campos obrigatórios para criar uma conta.`});
        }
    }}