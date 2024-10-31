module.exports =(sequelize, Sequalize) => {
    const Restaurant = sequelize.define("restaurant",{
        name: {
            type:Sequalize.STRING,
        },
        description : {
            type:Sequalize.STRING,
        },
        direction: {
            type:Sequalize.STRING,
        },
        phone: {
            type:Sequalize.STRING,
        },
        user_id :{
            type:Sequalize.INTEGER,
        }  
    });
    return Restaurant;
}