import { IPostsEntity } from "../../../domain/entities/post.entity";
import { IUsersEntity } from "../../../domain/entities/users.entity";
import createPostUsecase from "../../../domain/usecases/posts/create.post.usecase";
import createUsersUsecase from "../../../domain/usecases/users/create.user.usecase";
import FakerMocks from "./faker.mocks";
import IMocks from "./mocks.interface";

class Mocks {
    private _users: IUsersEntity[];
    private _posts: IPostsEntity[];


    constructor(mocksGenerator: IMocks){
        this._users = mocksGenerator.getUsers();
        this._posts = mocksGenerator.getPosts();
    }

    async createUsers(){
        let countUsers = 0;
        for(countUsers = 0; countUsers < this._users.length; countUsers++){
            await createUsersUsecase.execute(this._users[countUsers]);
        }
        return {
            createdUsers: countUsers
        };
    } 

    async createPosts() {
        let count;
        for (count = 0; count < this._posts.length; count++) {
            await createPostUsecase.execute(this._posts[count])
        }
        return {
            CreatedPosts: count
        }
    }
}


const mocks = new Mocks(new FakerMocks);

mocks.createUsers().then( (result) => {
    console.log(result)
}).then(()=>{
    mocks.createPosts().then((results)=>{
        console.log(results)
    })
})