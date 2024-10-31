
const db = require("../models");

exports.listRestaurant = function(req, res){
    const userRole = req.session.user.role; 
    db.restaurants.findAll({}).then(restaurants => {
        if(userRole === 'admin'){
            return res.render('restaurants/list.ejs', {restaurants: restaurants});
        }else{
            return res.render('restaurants/catalogue.ejs', {restaurants: restaurants});
        }

    });
}

exports.createRestaurant = function(req, res){
    res.render('restaurants/form.ejs', {restaurant: null, errors: null});
}


exports.insertRestaurant = function(req, res){
    const {errors, restaurant} = validateRestaurantForm(req);
    if(errors){
        res.render('restaurants/form.ejs', {restaurant: restaurant, errors: errors});
        return;
    }
    db.restaurants.create({
        name: req.body.name,
        description: req.body.description,
        direction: req.body.direction,
        phone: req.body.phone,
        user_id: req.session.user_id
    }).then(() => {
        res.redirect('/restaurants');
    });
}

exports.editRestaurant = async function (req, res) {
    const id = req.params.id;
    const restaurant = await db.restaurants.findByPk(id);
    res.render('restaurants/form.ejs', { restaurant: restaurant, errors: null });
}


exports.updateRestaurant = async function (req, res) {
    const validation = validateRestaurantForm(req);
    const errors = validation.errors;
    const restaurantErrors = validation.restaurant;
    if (errors) {
        res.render('restaurants/form.ejs', { restaurant: restaurantErrors, errors: errors });
        return;
    }
    const id = req.params.id;
    const restaurant = await db.restaurants.findByPk(id);
    restaurant.name = req.body.name;
    restaurant.description = req.body.description;
    restaurant.direction = req.body.direction;
    restaurant.phone = req.body.phone;
    await restaurant.save();
    res.redirect('/restaurants');
}


exports.deleteRestaurant = async function (req, res) {
    const id = req.params.id;
    const restaurant = await db.restaurants.findByPk(id);
    await restaurant.destroy();
    res.redirect('/restaurants');
}

const validateRestaurantForm = function (req) {
    if (!req.body.name || !req.body.description || !req.body.direction || !req.body.phone ) {
        const errors = {
            name: !req.body.name,
            description: !req.body.description,
            direction: !req.body.direction,
            phone: !req.body.phone,
        };
        errors.message = 'Todos los campos son obligatorios';
        const restaurant = {
            name: req.body.name,
            description: req.body.description,
            direction: req.body.direction,
            phone: req.body.phone,

        };
        return { errors, restaurant };
    }
    return { errors: null, restaurant: null };
}