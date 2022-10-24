import { IUsersEntity } from "../../entities/users.entity";
import { IUseCase } from "../interface.usecase";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import  UsersRepository  from "../../../adapter/repositories/users.repository";

export class CreateUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository) {}

    async execute(data: IUsersEntity): Promise<IUsersEntity|undefined> {
        return await this._repository.create(data)
    }
}

export default new CreateUsersUseCase(UsersRepository)