import * as Sequelize from "sequelize";

import { IUsersRepository } from "../../domain/repositories/users.repository.interface";
import { IDatabaseModel } from "../../infrastructure/persistence/database.model.interface";
import { IUsersEntity } from "../../domain/entities/users.entity";
import { MysqlDatabase } from "../../infrastructure/persistence/mysql/mysql.database";

import usersModelsMysql from "../../infrastructure/persistence/mysql/models/users.models.mysql";
import entityToModelUsersMysql from "../../infrastructure/persistence/mysql/helpers/users/entityToModel.users.mysql";
import modelToEntityUsersMysql from "../../infrastructure/persistence/mysql/helpers/users/modelToEntity.users.mysql";

export class UsersRepository implements IUsersRepository {
    constructor(
        private _database: IDatabaseModel,
        private _usersModel: Sequelize.ModelCtor<Sequelize.Model<any, any>>
    ){

    }

    async create(resource: IUsersEntity): Promise<IUsersEntity> {
        const { person } = entityToModelUsersMysql(resource)
        
        const personModel = await this._database.create(this._usersModel, person)
            
        return personModel
    }

    async list(): Promise<IUsersEntity[]> {
        const person = await this._database.list(this._usersModel);
        return person
    }

    async readById(resourceId: number): Promise<IUsersEntity | undefined> {
        try {
        const person  = await this._database.read(this._usersModel, resourceId)
        return modelToEntityUsersMysql(person)
        
        } catch (err) {
            console.error("Deu ruim", err)
        }
    }

    async deleteById(resourceId: number): Promise<void> {
        await this._database.delete(this._usersModel, { indexId: resourceId})
    }

    async updateById(resource: IUsersEntity): Promise<IUsersEntity | undefined> {
    
        let personModel = await this._database.read(this._usersModel, resource.indexId!)
       
        let { person } = entityToModelUsersMysql(resource)
        
        await this._database.update(personModel, person);
               
        return resource;
    }

    async login(resource: IUsersEntity): Promise<any> {
        const { person } = entityToModelUsersMysql(resource)
        const personLogin = await this._database.login(this._usersModel, person)
        return personLogin
    }
}

export default new UsersRepository(
    MysqlDatabase.getInstance(), 
    usersModelsMysql
    );