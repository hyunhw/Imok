'use strict';
module.exports = (sequelize, DataTypes) => {
    const bcrypt = require('bcrypt-nodejs');
    const user = sequelize.define('user', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        targetEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
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

    user.hook('beforeCreate', (user, options) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
            });
        });
    });


    user.validPassword = (password) => {
        debugger;
        return bcrypt.compareSync(password, this.password);
    };
    return user;
};
