import {IPostsEntity} from '../entities/post.entity'


export interface IPostsRepository{
    readById(resourceId: number): Promise<IPostsEntity | undefined>,
    create(resource: IPostsEntity): Promise<IPostsEntity>,
   /* deleteById(resourceId: number): Promise<void>,*/
    list(): Promise<IPostsEntity[]>,
    updateById(resource: IPostsEntity): Promise<IPostsEntity | undefined>
}
