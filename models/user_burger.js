module.exports = (sequelize, DataTypes) => {
    const UserBurger = sequelize.define('user_burger', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        burger_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'user_burger',
        timestamps: false
    });

    return UserBurger;
};