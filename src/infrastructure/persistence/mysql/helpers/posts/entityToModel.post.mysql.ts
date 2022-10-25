import {IPostsEntity} from '../../../../../domain/entities/post.entity'


export default function (post: IPostsEntity){
    const Post = {
        postid: post.postid,
        userid: post.userid,
        contentText: post.contentText
}
 
 return{
    Post:Post
 }

}