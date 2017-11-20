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
        console.log('hook function \'before create\' is being hit!');
        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash(user.password, salt, null, function(err, hash) {
        //         user.password = hash;
        //     });
        // });
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
        // return password === this.password;
    };

    function cryptPassword(password) {
        console.log('cryptPassword' + password);
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(10, function(err, salt) {
                // Encrypt password using bycrpt module
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
