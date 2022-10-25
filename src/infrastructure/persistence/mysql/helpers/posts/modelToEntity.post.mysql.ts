import {IPostsEntity} from '../../../../../domain/entities/post.entity'
import entityToModelPostMysql from './entityToModel.post.mysql'


export default function (post: any):IPostsEntity | undefined {
    if(!post){
        return
    }
    

    let entity:IPostsEntity = {
        postid: post.postid,
        userid: post.userid,
        contentText: post.contentText,
       
        
    }

    return (entity as IPostsEntity)

}