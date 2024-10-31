const { requireUser } = require("../middleware/require-user.js");
module.exports = app =>{
    let router = require("express").Router();
    const burgerController = require("../controllers/burger.controller.js");

    router.get("/restaurant/:restaurantId", burgerController.listBurgerByRestaurant);
    router.get("/:restaurantId/create", requireUser, burgerController.createBurger);
    router.post("/:restaurantId/create", requireUser, burgerController.insertBurger);
    router.get("/:id/edit", requireUser, burgerController.editBurger);
    router.post("/:id/edit", requireUser, burgerController.updateBurger);
    router.post("/:id/delete", requireUser, burgerController.deleteBurger);
    router.get("/:id/photo",  requireUser, burgerController.uploadBurgerPhotoGet);
    router.post("/:id/photo", requireUser, burgerController.uploadBurgerPhotoPost);
    router.get("/:id/detail", burgerController.detailBurger)

    
    router.post('/:id/mark-eaten', burgerController.markEaten);

    app.use('/burgers', router);



}