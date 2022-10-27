/*import { IPostsEntity } from "../../entities/post.entity";
import { IUseCase } from "../interface.usecase";
import { IPostsRepository } from "../../repositories/post.repository.interface";
import  PostRepository  from "../../../adapter/repositories/posts.repositories";
import { executionAsyncId } from "async_hooks";

export class ReadPostsIdUserUseCase implements IUseCase {
    constructor(private _repository: IPostsRepository){
        
    }
    async execute(UserId: String){
           return await this._repository.groupPostsByIdUser(UserId);
    }
}

export default new ReadPostsIdUserUseCase(
    PostRepository
    ); */