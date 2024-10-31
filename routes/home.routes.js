module.exports = app =>{
    let router = require("express").Router();
    const homeController = require("../controllers/home.controller.js");

    router.get("/login",homeController.login);
    router.post("/login", homeController.authenticate);
    router.get("/logout", homeController.logout);
    router.get("/concatenar", homeController.concatenar);
    router.get('/', homeController.index)

    app.use('/', router);
}