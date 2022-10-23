import { IUsersEntity } from "../../entities/users.entity";
import { IUseCase } from "../interface.usecase";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import  UsersRepository  from "../../../adapter/repositories/users.repository";

class ReadUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){}

    async execute(data: { UserId: number }): Promise<IUsersEntity | undefined> { 
        return await this._repository.readById(data.UserId)
    }
}

export default new ReadUsersUseCase(
    UsersRepository
    );