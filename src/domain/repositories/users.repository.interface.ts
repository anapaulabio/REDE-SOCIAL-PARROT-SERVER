import { IUsersEntity } from "../entities/users.entity";

export interface IUsersRepository {
    readById(resourceId: number): Promise<IUsersEntity | undefined>,
    create(resource: IUsersEntity): Promise<IUsersEntity>,
    deleteById(resourceId: number): Promise<void>,
    list(): Promise<IUsersEntity[]>,
    updateById(resource:IUsersEntity): Promise<IUsersEntity | undefined>,
    login(resource: IUsersEntity): Promise<IUsersEntity>

}