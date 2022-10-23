import * as Sequelize from "sequelize";

import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { IPostsEntity } from "../../domain/entities/post.entity";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IPostsRepository } from "../../domain/repositories/post.repository.interface";

import postsModel from "../../infrastructure/persistence/mysql/models/posts.model";
import entityToModelAccount from "../../infrastructure/persistence/mysql/helpers/posts/entityToModel.post.mysql";
import modelToEntityPostMysql from "../../infrastructure/persistence/mysql/helpers/posts/modelToEntity.post.mysql";
/*import modelToEntityAccount from "../../infra/persistence/mysql/helpers/accounts/modelToEntity.account.mysql";*/

export class PostsRepositories implements IPostsRepository {

    constructor(
    private _database:IDatabaseModel,
    private _postModel: any
    ){}
    
    async create(resource: IPostsEntity): Promise<IPostsEntity> {
        const {Post} = entityToModelAccount(resource);
        const postsModel = await this._database.create(this._postModel, Post)

        resource.indexId = postsModel.null
        return resource
    } 
    
    async list():Promise<IPostsEntity[]>{
      const postsModel = await this._database.list(this._postModel)
      const post = postsModel.map(modelToEntityPostMysql)

      return post

    }



}

export default new PostsRepositories(
 MysqlDatabase.getInstance(),
 postsModel

)