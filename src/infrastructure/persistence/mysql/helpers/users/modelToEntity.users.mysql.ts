import bcrypt from "bcrypt";
import { IUsersEntity } from "../../../../../domain/entities/users.entity";

export default (user: any): IUsersEntity | undefined => {
    if (!user){
    return
    }

    let person: IUsersEntity = {
        indexId: user.indexId,
        name: user.name,
        email: user.email,
        apartment: user.apartment,
        password: user.password = bcrypt.hashSync(user.password, 10),
        linkdafoto: user.linkdafoto
    }

    return (person as IUsersEntity);
}