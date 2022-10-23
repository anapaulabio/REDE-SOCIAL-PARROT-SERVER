import * as Sequelize from "sequelize"; 
import { MysqlDatabase } from "../mysql.database";

export default MysqlDatabase.getInstance().createModel('users', {
    indexId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        field: 'userid'
    },
    name: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    apartment: Sequelize.DataTypes.NUMBER,
    password: Sequelize.DataTypes.STRING,
    linkdafoto: {
        type: Sequelize.DataTypes.STRING,
        field: 'link_da_foto'
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        field: 'updated_at'
    }
});