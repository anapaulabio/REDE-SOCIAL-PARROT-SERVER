import express from 'express';
import debug from 'debug';

import createPostUsecase from '../../../domain/usecases/posts/create.post.usecase';
import listPostUsecase from '../../../domain/usecases/posts/list.post.usecase';
import readPostUsecase from '../../../domain/usecases/posts/read.post.usecase';
import updatePostUsecase from '../../../domain/usecases/posts/update.post.usecase';

//import ReadPostByIdUser from '../../../domain/usecases/posts/Read.post.byIdUser';

import { getErrorMessage } from '../helpers/errors.helper.adapter';

class PostController {
    async listPosts(req: express.Request, res: express.Response) {
        /*comm */
        try {
            const posts = await listPostUsecase.execute();
            debug.log(posts)
            res.status(200).send(posts);
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

    async getPostById(req: express.Request, res: express.Response) {
        try {
            const post = await readPostUsecase.execute({
                PostId: Number(req.params.PostId)
            })

            res.status(200).send(post)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error));
        }
    }

    async createPosts(req: express.Request, res: express.Response) {
        try {
            const posts = await createPostUsecase.execute(req.body);
            debug.log(posts)
    
            res.status(201).send(posts);
        } catch (error) {
            return res.status(500).send(getErrorMessage(error)); 
        }
    }

    async updatePosts(req: express.Request, res: express.Response) {
        try {
            let post = await updatePostUsecase.execute(req.body)

            res.status(200).send(post)
        } catch (error) {
            return res.status(500).send(getErrorMessage(error)); 
        }
    }


/*async postsByIdUser(req: express.Request, res: express.Response){
    const posts = await ReadPostByIdUser.execute(req.params.UserId)
    res.status(200).send(posts);
}*/

    async postByUser(req: express.Request, res: express.Response){
        const post = await readPostByUser.execute(req.body);
        res.status(200).send(post);

} 

}
export default new PostController();