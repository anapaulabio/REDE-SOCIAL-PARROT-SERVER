import {IPostsEntity} from '../../../../../domain/entities/post.entity'


export default function (post: IPostsEntity){
    const Post = {
        userid: post.indexId,
        content: post.contentText
}
 
 return{
    Post:Post
 }

}