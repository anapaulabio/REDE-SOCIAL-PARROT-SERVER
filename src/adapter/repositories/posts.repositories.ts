import * as Sequelize from "sequelize";

import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { IPostsEntity } from "../../domain/entities/post.entity";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";
import { IPostsRepository } from "../../domain/repositories/post.repository.interface";

import postsModel from "../../infrastructure/persistence/mysql/models/posts.model";
import entityToModelPost from "../../infrastructure/persistence/mysql/helpers/posts/entityToModel.post.mysql";
import modelToEntityPostMysql from "../../infrastructure/persistence/mysql/helpers/posts/modelToEntity.post.mysql";
import * as sequelize from "sequelize";
/*import modelToEntityAccount from "../../infra/persistence/mysql/helpers/accounts/modelToEntity.account.mysql";*/

export class PostsRepositories implements IPostsRepository {

    constructor(
    private _database:IDatabaseModel,
    private _postModel: sequelize.ModelCtor<sequelize.Model<any, any>>
    ){}
    
    async create(resource: IPostsEntity): Promise<IPostsEntity> {
        const {Post} = entityToModelPost(resource);
        const postsModel = await this._database.create(this._postModel, Post)

        return postsModel
    } 
    
    async list():Promise<IPostsEntity[]>{
      const postsModel = await this._database.list(this._postModel)
      const post = postsModel.map(modelToEntityPostMysql)

      return post

    }

    async readById(resourceId: number): Promise<IPostsEntity | undefined> {
      try {
      const post  = await this._database.read(this._postModel, resourceId)
      return modelToEntityPostMysql(post)
      
      } catch (err) {
          console.error("Deu ruim", err)
      }
  }

  async updateById(resource: IPostsEntity): Promise<IPostsEntity | undefined> {
    
    let postModel = await this._database.read(this._postModel, resource.postid!)
   
    let { Post } = entityToModelPost(resource)
    
    await this._database.update(postModel, Post);
           
    return resource;
}

}

export default new PostsRepositories(
 MysqlDatabase.getInstance(),
 postsModel
)