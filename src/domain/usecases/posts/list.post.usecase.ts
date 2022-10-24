
import { IPostsEntity } from "../../entities/post.entity";
import { IPostsRepository } from "../../repositories/post.repository.interface";
import { IUseCase} from "../interface.usecase";
import postsRepositories from "../../../adapter/repositories/posts.repositories";




class ListPostUseCase implements IUseCase {

    constructor(private _repository: IPostsRepository) {}

    async execute(): Promise<IPostsEntity[] | undefined> {
        return await this._repository.list();
    }
}

export default new ListPostUseCase(
    postsRepositories
);