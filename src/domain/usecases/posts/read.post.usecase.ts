import { IPostsEntity } from "../../entities/post.entity";
import { IUseCase } from "../interface.usecase";
import { IPostsRepository } from "../../repositories/post.repository.interface";
import  PostRepository  from "../../../adapter/repositories/posts.repositories";

class ReadPostsUseCase implements IUseCase {
    constructor(private _repository: IPostsRepository){}

    async execute(data: { PostId: number }): Promise<IPostsEntity | undefined> { 
        return await this._repository.readById(data.PostId)
    }
}

export default new ReadPostsUseCase(
    PostRepository
    );