import express from 'express';
import createPostUsecase from '../../../domain/usecases/posts/create.post.usecase';
import listPostUsecase from '../../../domain/usecases/posts/list.post.usecase';
import readPostUsecase from '../../../domain/usecases/posts/read.post.usecase';
import updatePostUsecase from '../../../domain/usecases/posts/update.post.usecase';
import debug from 'debug';



class PostController { 
    async listPosts(req: express.Request, res: express.Response){
/*comm */
        try{
            const posts = await listPostUsecase.execute();
            debug.log(posts)
            res.status(200).send(posts);
        }catch(error){
            console.error(error)
            res.status(404).send("erro, chame um admin")
        }
        


    }

    async getPostById(req: express.Request, res: express.Response){
        const post = await readPostUsecase.execute({
            PostId: Number(req.params.PostId)
        })
        res.status(200).send(post)
    } 

    async createPosts(req: express.Request, res: express.Response) {
        const posts = await createPostUsecase.execute(req.body);
        debug.log(posts)
        
        res.status(201).send(posts);

    }
async updatePosts(req: express.Request, res: express.Response) {
    let post = await updatePostUsecase.execute(req.body)
    
    res.status(200).send(post)
}
}

export default new PostController();