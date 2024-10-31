const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.restaurants = require("./restaurant.model.js")(sequelize, Sequelize);
db.burgers = require("./burger.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);
db.user_burger = require("./user_burger.js")(sequelize, Sequelize);


// One restaurant has many burgers and many burgers belongs to a restaurant
// One restaurant has many burgers and many burgers belongs to a restaurant
db.restaurants.hasMany(db.burgers, {
    foreignKey: 'restaurant_id',  // La clave foránea estará en la tabla Hamburguesa
    as: 'burgers',
});

db.burgers.belongsTo(db.restaurants, {
    foreignKey: 'restaurant_id',
    as: 'restaurant',
});


// many to many users-burgers
db.users.belongsToMany(db.burgers, {
    through: "user_burger",
    as: "burgers",
    foreignKey: "user_id",
});
db.burgers.belongsToMany(db.users, {
    through: "user_burger",
    as: "users",
    foreignKey: "burger_id",
});



// one to many burger-review cada hamburguesa puede tener muchas reviews.
db.burgers.hasMany(db.reviews, {
    foreignKey: 'burger_id',  // La clave foránea estará en la tabla Review
    as: 'reviews',
});

db.reviews.belongsTo(db.burgers, {
    foreignKey: 'burger_id',
    as: 'burger',
});

// one to many user-review cada usuario puede tener muchas reviews.

db.users.hasMany(db.reviews, {
    foreignKey: 'user_id',  // La clave foránea estará en la tabla Review
    as: 'reviews',
});

db.reviews.belongsTo(db.users, {
    foreignKey: 'user_id',
    as: 'user',
});






module.exports = db;