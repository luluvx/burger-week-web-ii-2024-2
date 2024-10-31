module.exports =(sequelize, Sequalize) => {
    const Review = sequelize.define("review",{
        review: {
            type:Sequalize.STRING,
        },
        qualification: {
            type:Sequalize.INTEGER,
        },
        user_id: {
            type:Sequalize.INTEGER,
        },
        burger_id: {
            type:Sequalize.INTEGER,
        }
        
    });
    return Review;
}