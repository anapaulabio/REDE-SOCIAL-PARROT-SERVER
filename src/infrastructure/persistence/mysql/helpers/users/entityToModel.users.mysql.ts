import bcrypt from "bcrypt";
import { IUsersEntity } from "../../../../../domain/entities/users.entity";

export default (user: IUsersEntity) => {
    const person = {
        indexId: user.indexId,
        name: user.name,
        email: user.email,
        apartment: user.apartment,
        password: user.password = bcrypt.hashSync(user.password, 10),
        linkdafoto: user.linkdafoto
    }

    return {
        person: person
    }
}