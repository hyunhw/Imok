'use strict';
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('user', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        targetEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    user.associate = (models) => {
        user.hasMany(models.checkin, {
            foreignKey: 'userId',
            as: 'checkins'
        });
    };
    return user;
};
