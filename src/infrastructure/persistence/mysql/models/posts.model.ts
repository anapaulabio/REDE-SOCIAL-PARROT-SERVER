import { MysqlDatabase } from '../mysql.database'
import { DataTypes } from "sequelize";
import { create } from 'domain';

export default MysqlDatabase.getInstance().createModel('posts', {
    postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        },
    userid: {
        type: DataTypes.INTEGER,
        
    },
   content_text: DataTypes.STRING,
   createdAt: DataTypes.DATE,
   updateAt: DataTypes.DATE
})