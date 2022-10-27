import IMocksUser from "./mocks.interface";
import { faker } from "@faker-js/faker";
import { IUsersEntity } from "../../../../domain/entities/users.entity";

export default class FakerMocksUser implements IMocksUser {
    getUsers(): IUsersEntity[] {
        let usersMock: IUsersEntity[] = [];
        usersMock = this._getUsersMock()
        return (this.getUsers() as IUsersEntity[])
    }


    private _getUsersMock(): IUsersEntity[] {
        let usersMock: IUsersEntity[] = [];
        Array.from({ length: 10 }).forEach(()=> {
            usersMock.push({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                apartment: Number(faker.address.buildingNumber()),
                password: faker.internet.password(8, true, /[A-Z]/),
                linkdafoto: faker.image.people()
            })
        })
        return usersMock
    }
}
