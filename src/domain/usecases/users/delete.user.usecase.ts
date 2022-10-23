import { IUseCase } from "../interface.usecase";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import  UsersRepository  from "../../../adapter/repositories/users.repository";

class DeleteUsersUseCase implements IUseCase {
    constructor(private _repository: IUsersRepository){}

    async execute(data: { UserId: number }): Promise<void> {
        return await this._repository.deleteById(data.UserId)
    }
}

export default new DeleteUsersUseCase(UsersRepository)