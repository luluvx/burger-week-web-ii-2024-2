const db = require("../models");




exports.createBurger = function (req, res) {
    const restaurantId = req.params.restaurantId;
    res.render('burgers/form.ejs', { burger: null, errors: null ,restaurantId:restaurantId });
}

exports.insertBurger = function (req, res) {
    console.log(req.params.restaurantId)
    const restaurantId = req.params.restaurantId;


    const { errors, burger } = validateBurgerForm(req);
    if (errors) {
        res.render('burgers/form.ejs', { burger: burger, errors: errors });
        return;
    }
    db.burgers.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        restaurant_id: restaurantId
    }).then(() => {
        res.redirect(`/burgers/restaurant/${restaurantId}`);
    });
}

exports.editBurger = async function (req, res) {
    const id = req.params.id;
    const burger = await db.burgers.findByPk(id);
    res.render('burgers/form.ejs', { burger: burger, errors: null });
}

exports.updateBurger = async function (req, res) {
    const validation = validateBurgerForm(req);
    const errors = validation.errors;
    const burgerErrors = validation.burger;
    if (errors) {
        res.render('burgers/form.ejs', { burger: burgerErrors, errors: errors });
        return;
    }
    const id = req.params.id;
    const burger = await db.burgers.findByPk(id);
    burger.name = req.body.name;
    burger.description = req.body.description;
    burger.price = req.body.price;
    await burger.save();
    const restaurantId = burger.restaurant_id
    res.redirect(`/burgers/restaurant/${restaurantId}`);
}

exports.deleteBurger = async function (req, res) {
    const id = req.params.id;
    const burger = await db.burgers.findByPk(id);
    await burger.destroy();
    const restaurantId = burger.restaurant_id

    res.redirect(`/burgers/restaurant/${restaurantId}`);
}

exports.listBurgerByRestaurant = function (req, res) {
    const userRole = req.session.user.role;
    const restaurantId = req.params.restaurantId; // Capturar la ID del restaurante desde la URL

    db.burgers.findAll({
        where: { restaurant_id: restaurantId } // Filtrar hamburguesas por la ID del restaurante
    }).then(burgers => {
        if (userRole === 'admin') {
            return res.render('burgers/list.ejs', { burgers: burgers, restaurantId: restaurantId });
        } else {
            return res.render('burgers/catalogue.ejs', { burgers: burgers, restaurantId: restaurantId });
        }

    });
};

exports.uploadBurgerPhotoGet = async function (req, res) {
    const burgerId = req.params.id;
    const burger = await db.burgers.findByPk(burgerId);
    res.render('burgers/upload-burger-photo.ejs', { burger: burger, errors: null });
    
    
}

exports.uploadBurgerPhotoPost = async function (req, res) {
    const burgerId = req.params.id;
    const burger = await db.burgers.findByPk(burgerId);
  
    if (!req.files?.photo) {
        res.render('burgers/upload-burger-photo.ejs', { errors: { message: 'Debe seleccionar una imagen' }, burger });
        return;
    }
    
    const image = req.files.photo;
      // eslint-disable-next-line no-undef
    const path = __dirname + '/../public/images/burgers/' + burger.id + '.jpg';
    const restaurantId = burger.restaurant_id;


    image.mv(path, function (err) {
        if (err) {
            console.log('Error al subir la imagen:', err);
            res.render('burgers/upload-burger-photo.ejs', { errors: { message: 'Error al subir la imagen' }, burger });
            return;
        }
        
 
        res.redirect(`/burgers/restaurant/${restaurantId}`);
    });
};


exports.detailBurger = async function (req, res) {
    const burgerId = req.params.id;
    try {
        const burger = await db.burgers.findByPk(burgerId);
        const reviews = await db.reviews.findAll({
            where: { burger_id: burgerId },
            include: [{ model: db.users, as: 'user' }]
        });

        
        res.render('burgers/detail.ejs', { 
            burger: burger, 
            reviews: reviews, 
            message: req.session.message || null 
        });

        
        req.session.message = null;

    } catch (error) {
        console.error('Error al obtener los detalles de la hamburguesa:', error);
        res.status(500).send('Error del servidor');
    }
}


exports.markEaten = async function (req, res) {
    if (!req.session.user) {
        console.error('Error: Usuario no autenticado');
        return res.status(401).send('Usuario no autenticado');
    }

    const userId = req.session.user.id; 
    const burgerId = req.params.id;

    if (!burgerId) {
        console.error('Error: burgerId es null');
        return res.status(400).send('Bad Request: burgerId es null');
    }

    try {
        const existingRecord = await db.user_burger.findOne({
            where: {
                user_id: userId,
                burger_id: burgerId
            }
        });

        if (existingRecord) {
            console.log('El usuario ya ha marcado esta hamburguesa como comida.');
            
            
            req.session.message = 'Ya has marcado esta hamburguesa como comida.';
            return res.redirect(`/burgers/${burgerId}/detail`);
        }

        
        await db.user_burger.create({
            user_id: userId,
            burger_id: burgerId
        });

        res.redirect(`/reviews/${burgerId}/create`); 
    } catch (error) {
        console.error('Error al marcar la hamburguesa como comida:', error);
        res.status(500).send('Error del servidor');
    }
};


const validateBurgerForm = function (req) {
    if (!req.body.name || !req.body.description || !req.body.price) {
        const errors = {
            name: !req.body.name,
            description: !req.body.description,
            price: !req.body.price
        };
        errors.message = 'Todos los campos son obligatorios';
        const burger = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        };
        return { errors, burger };
    }
    return { errors: null, burger: null };
}