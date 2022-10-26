import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('posts', {
            postid:  {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'postid'
            },
            userid: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'users'
                    },
                    key: 'userid'
                }
            },
            contentText: {
                type: Sequelize.DataTypes.STRING,
                field: 'content_text'
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE,
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE,
                field: 'updated_at'
            }
        })
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('posts');
    }
}