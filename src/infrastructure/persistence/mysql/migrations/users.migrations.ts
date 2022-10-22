import * as Sequelize from 'sequelize';

export default {
    up: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.createTable('users', {
            indexId:  {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                field: 'userid'
            },
            name: Sequelize.DataTypes.STRING,
            email: Sequelize.DataTypes.STRING,
            apartment: Sequelize.DataTypes.INTEGER,
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
        })
    },
    down: (queryInterface: Sequelize.QueryInterface) => {
        return queryInterface.dropTable('users');
    }
};