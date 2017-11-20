'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
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
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                user.password = hash;
            });
        });
    });
    user.prototype.validPassword = function (password) {
        // return bcrypt.compareSync(password, this.password);
        return password === this.password;
    };
    return user;
};
