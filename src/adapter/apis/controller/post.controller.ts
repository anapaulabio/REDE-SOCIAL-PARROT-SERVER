import express from 'express';
import createPostUsecase from '../../../domain/usecases/posts/create.post.usecase';
import listPostUsecase from '../../../domain/usecases/posts/list.post.usecase';
import debug from 'debug';



class PostController { 
    async listPosts(req: express.Request, res: express.Response){
        const posts = await listPostUsecase.execute();
        res.status(200).send(posts);
        debug.log(posts)

    }
    async createPosts(req: express.Request, res: express.Response) {
        const posts = await createPostUsecase.execute(req.body);
        debug.log(posts)
        
        res.status(201).send(posts);

}}

export default new PostController();