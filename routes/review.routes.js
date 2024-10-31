module.exports = app =>{
    let router = require("express").Router();
    const reviewController = require("../controllers/review.controller.js");

    router.get("/:burgerId/create", reviewController.createReview);
    router.post("/:burgerId/create", reviewController.insertReview);

    
    app.use('/reviews', router);



}
