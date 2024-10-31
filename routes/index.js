module.exports = app => {
    require('./user.routes')(app);
    require('./restaurant.routes')(app);
    require('./home.routes')(app);
    require('./burger.routes')(app);
    require('./review.routes')(app);
}