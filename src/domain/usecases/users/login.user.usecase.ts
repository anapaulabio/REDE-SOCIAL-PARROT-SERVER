import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import secret from "../../../infrastructure/config/secret.config";
import { IUseCase } from "../interface.usecase";
import { IUsersEntity } from "../../entities/users.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import usersRepository from "../../../adapter/repositories/users.repository";

class LoginUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) { }

    async execute(data: { email: string, password: string }): Promise<any> {
        const user = await this._repository.login(data);
        if (!user){
            console.error("Senha ou email inválido, tente novamente")
        }

        let isMatch = bcrypt.compareSync(data.password, user.password)
        if(!isMatch){
            console.error("Senha ou email inválido, tente novamente")
        }
        const token = jwt.sign({
            indexId: user.indexId,
            name: user.name,
            email: user.email,
            apartment: user.apartment
        },
            secret)
        
        return {data: user, token}
    }

    
}

export default new LoginUseCase(usersRepository)