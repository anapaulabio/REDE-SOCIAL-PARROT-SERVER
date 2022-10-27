import { IUsersEntity } from "../../../../domain/entities/users.entity";

export default interface IMocksUser {
    getUsers(): IUsersEntity[];
} 