import { IPostsEntity } from "../../entities/post.entity";
import { IUseCase } from "../interface.usecase";
import { IPostsRepository } from "../../repositories/post.repository.interface";
import  PostRepository  from "../../../adapter/repositories/posts.repositories"; 


class UpdatePostsUseCase implements IUseCase {
    constructor(private _repository: IPostsRepository){}

    async execute(data: IPostsEntity) : Promise<IPostsEntity | undefined> {
        return await this._repository.updateById(data)
    }
    
}

export default new UpdatePostsUseCase(PostRepository)