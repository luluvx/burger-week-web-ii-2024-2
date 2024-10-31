module.exports =(sequelize, Sequalize) => {
    const Burger = sequelize.define("burger",{
        name: {
            type:Sequalize.STRING,
        },
        description: {
            type:Sequalize.STRING,
        },
        price: {
            type:Sequalize.INTEGER,
        },
        restaurant_id: {
            type:Sequalize.INTEGER,
        }


    });
    return Burger;
}