import { IPostsEntity } from "../../../../domain/entities/post.entity";
import { IUsersEntity } from "../../../../domain/entities/users.entity";

export default interface IMocks {
    getUsers(): IUsersEntity[];
    getPosts(): IPostsEntity[];
} 