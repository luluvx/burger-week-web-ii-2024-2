module.exports = app =>{
    let router = require("express").Router();
    const userController = require("../controllers/user.controller");

    router.get("/register", userController.createUser);
    router.post("/register", userController.insertUser);

    app.use('/users', router);
}