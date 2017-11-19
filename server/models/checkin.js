'use strict';
module.exports = (sequelize, DataTypes) => {
    const checkin = sequelize.define('checkin', {
        checkedinAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    checkin.associate = (models) => {
        checkin.belongsTo(models.user, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            onDelete: 'CASCADE'
        });
    };
    return checkin;
};
