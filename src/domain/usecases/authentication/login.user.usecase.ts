import { IUseCase } from "../interface.usecase";
import { IUsersEntity } from "../../entities/users.entity";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import usersRepository from "../../../adapter/repositories/users.repository";

class LoginUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) { }

    async execute(data: { email: string, password: string }): Promise<IUsersEntity> {
         return await this._repository.login(data);

    }

}

export default new LoginUseCase(usersRepository)