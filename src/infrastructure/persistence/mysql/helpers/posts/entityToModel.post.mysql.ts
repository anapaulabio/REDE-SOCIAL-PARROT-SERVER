import {IPostsEntity} from '../../../../../domain/entities/post.entity'


export default function (post: IPostsEntity){
    const Post = {
        indexId: post.indexId,
        content: post.contentText
}
 
 return{
    Post:Post
 }

}