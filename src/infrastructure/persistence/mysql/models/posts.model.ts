import { MysqlDatabase } from '../mysql.database'
import { DataTypes } from "sequelize";
import { create } from 'domain';

export default MysqlDatabase.getInstance().createModel('posts', {
    postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'postid'
    },
    userid: {
        type: DataTypes.INTEGER,
        field: 'userid'
    },
   contentText:{
   type:  DataTypes.STRING,
   field: 'content_text'
    } ,
   createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
    },
    updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at'
    }
})