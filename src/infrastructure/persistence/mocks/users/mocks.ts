import IMocksUser from "./mocks.interface";
import FakerMocksUser from "./faker.mocks";

import { IUsersEntity } from "../../../../domain/entities/users.entity";
import createUserUsecase from "../../../../domain/usecases/users/create.user.usecase";

class Mocks {
    private _users: IUsersEntity[];

    constructor(mocksGenerator: IMocksUser){
        this._users = mocksGenerator.getUsers()
    }

    async createUsers() {
        let countUsers = 0;
        for(countUsers = 0; countUsers < this._users.length; countUsers++){
            await createUserUsecase.execute(this._users[countUsers]);
        }
        return {
            createdUsers: countUsers
        };
    }
}

const mocks = new Mocks(new FakerMocksUser);
mocks.createUsers().then((result) => {
    console.log(result);
});
