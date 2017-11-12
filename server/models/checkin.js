'use strict';
module.exports = (sequelize, DataTypes) => {
  var checkin = sequelize.define('checkin', {
    checkedinAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
  });

    checkin.associate = (models) => {
        checkin.belongsTo(models.user, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
  return checkin;
};
