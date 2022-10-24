import { MysqlDatabase } from '../mysql.database'
import { DataTypes } from "sequelize";
import { create } from 'domain';

export default MysqlDatabase.getInstance().createModel('posts', {
    indexId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'postid'
    },
   contentText: DataTypes.STRING,
   createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
},
    updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
}
})