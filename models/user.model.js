module.exports =(sequelize, Sequalize)=>{
    const User = sequelize.define("user",{
        name: {
            type:Sequalize.STRING,
        },
        last_name: {
            type:Sequalize.STRING,
        },
        email:{
            type:Sequalize.STRING,
            unique: true,
        },
        password:{
            type: Sequalize.STRING
        },
        role:{
            type:Sequalize.ENUM('user', 'admin'),
            defaultValue: 'user',
        }
    });

    return User;
}