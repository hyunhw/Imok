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
        return cryptPassword(user.password)
            .then( hashed => {
                user.password = hashed;
            })
            .catch( err => {
                if (err) console.log(err);
            });
    });
    user.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    /*
     * bcrypt hash is async so needs to return a promise in order to hash and save pw in db
     */
    function cryptPassword (password) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, function(err, salt) {
                // Encrypt password using bcrypt module
                if (err) return reject(err);

                bcrypt.hash(password, salt, null, function(err, hash) {
                    if (err) return reject(err);
                    return resolve(hash);
                });
            });
        });
    }
    return user;
};
