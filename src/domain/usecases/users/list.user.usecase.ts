import { IUsersEntity } from "../../entities/users.entity";
import { IUseCase } from "../interface.usecase";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import  UsersRepository  from "../../../adapter/repositories/users.repository";

class ListUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){}

    async execute(): Promise<IUsersEntity[] | undefined> {
        return await this._repository.list()
        
    }
}

export default new ListUsersUseCase(UsersRepository)