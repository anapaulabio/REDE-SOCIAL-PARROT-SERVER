import { IUsersEntity } from "../../entities/users.entity";
import { IUseCase } from "../interface.usecase";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import  UsersRepository  from "../../../adapter/repositories/users.repository";

class UpdateUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){}

    async execute(data: IUsersEntity) : Promise<IUsersEntity | undefined> {
        return await this._repository.updateById(data)
    }
    
}

export default new UpdateUsersUseCase(UsersRepository)