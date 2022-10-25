import bcrypt from "bcrypt";
import { IUsersEntity } from "../../../../../domain/entities/users.entity";

export default (user: IUsersEntity) => {
    let passHash = bcrypt.hashSync(user.password, 10)
    const person = {
        indexId: user.indexId,
        name: user.name,
        email: user.email,
        apartment: user.apartment,
        password: passHash,
        linkdafoto: user.linkdafoto
    }

    return {
        person: person
    }
}