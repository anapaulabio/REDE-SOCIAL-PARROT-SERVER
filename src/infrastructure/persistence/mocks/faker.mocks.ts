import IMocks from "./mocks.interface";
import { faker } from "@faker-js/faker";
import { IUsersEntity } from "../../../domain/entities/users.entity";
import { IPostsEntity } from "../../../domain/entities/post.entity";

export default class FakerMocks implements IMocks {
    getUsers(): IUsersEntity[] {
        let users: IUsersEntity[] = []
        users = this._getUsers();
        return (users as IUsersEntity[]);
    }

    getPosts(): IPostsEntity[] {
        let posts: IPostsEntity[] = []
        posts = this._getPosts()
        return (posts as IPostsEntity[]);
    }

  
    private _getUsers(): IUsersEntity[] {
        const usersMock: IUsersEntity[] = [];
        let nameGenerate, emailGenerate
        Array.from({ length: 20 }).forEach(()=> {
            nameGenerate = faker.name.fullName();
            emailGenerate = faker.helpers.unique(faker.internet.email, [nameGenerate]).toLocaleLowerCase();

            usersMock.push({
                name: nameGenerate,
                email: emailGenerate,
                apartment: Number(faker.finance.amount()),
                password: String(faker.internet.password(8, true)),
                linkdafoto: faker.image.people()
               
            })
        })
        return usersMock
    }

   private _getPosts(): IPostsEntity[] {
        const posts: IPostsEntity[] = [];
        let iduser;
        Array.from({ length: 40 }).forEach(() => {
            iduser = Number(faker.finance.amount(1, 20, 0));
            posts.push({
                userid: iduser,
                contentText: faker.lorem.words(Number(faker.finance.amount(1, 30, 0)))
            })
        })
        return posts;
    }

}
