import { exitOnError } from "winston";
import { IPostsEntity } from "../../entities/post.entity";
import { IPostsRepository } from "../../repositories/post.repository.interface";
import { IUseCase} from "../interface.usecase";
import PostsRepositories from '../../../adapter/repositories/posts.repositories'




export class CreatePostUseCase implements IUseCase {

  constructor(private _repository: IPostsRepository){}

  async execute(data: IPostsEntity): Promise<IPostsEntity | undefined> {
    
    return await this._repository.create(data);
      
  }

}

export default new CreatePostUseCase(
  PostsRepositories

);



/*export class CreateAccountUseCase implements IUseCase {

    constructor(private _repository: IAccountsRepository) {}

    async execute(data: AccountEntity): Promise<AccountEntity | undefined> {
        return await this._repository.create(data);
    }
}

export default new CreateAccountUseCase(
    accountsRepository
); */