const { requireUser } = require("../middleware/require-user.js");

module.exports = app => {
    let router = require("express").Router();
    const restaurantController =
        require("../controllers/restaurant.controller.js");

    router.get("/", requireUser, restaurantController.listRestaurant);
    router.get("/create", requireUser, restaurantController.createRestaurant);
    router.post("/create", requireUser, restaurantController.insertRestaurant);
    router.get("/:id/edit", requireUser, restaurantController.editRestaurant);
    router.post("/:id/edit", requireUser, restaurantController.updateRestaurant);
    router.post("/:id/delete", requireUser, restaurantController.deleteRestaurant);



    app.use('/restaurants', router);
}