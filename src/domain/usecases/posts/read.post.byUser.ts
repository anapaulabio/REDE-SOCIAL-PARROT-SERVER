import { IPostsEntity } from "../../entities/post.entity";
import { IUseCase } from "../interface.usecase";
import { IPostsRepository } from "../../repositories/post.repository.interface";
import  postsRepositories  from "../../../adapter/repositories/posts.repositories";


export class PostByUserUseCase implements IUseCase {
    constructor(private _repository: IPostsRepository){

    }

    async execute(data: { userid: number}) {
        const post = await this._repository.readByWhere(data.userid);

    
        return;
    }
}

export default new PostByUserUseCase(
    postsRepositories
);