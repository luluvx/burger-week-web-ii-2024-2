
const db = require("../models");
const sha1 = require('sha1');

exports.createUser = function(req, res){
    res.render('user/register.ejs', { user: null, errors:null });
}


exports.insertUser = function(req, res){
    const { errors, user } = validateUserForm(req);
    if (errors) {
        return res.render('user/register.ejs', { user, errors });
    }
    db.users.create({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: sha1(req.body.password)
    })
    .then(() => {
        res.redirect('/login');
    })
    .catch(err => {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.render('user/register.ejs', { 
                user, 
                errors: { message: 'El email ya está registrado' }
            });
        }
        console.error(err);
        return res.status(500).send("Error en el registro del usuario");
    });
}

const validateUserForm = function (req) {
    if (!req.body.name || !req.body.last_name || !req.body.email || !req.body.password) {
        const errors = {
            name: !req.body.name,
            last_name: !req.body.last_name,
            email: !req.body.email,
            password: !req.body.password
        };
        errors.message = 'Todos los campos son obligatorios';
        const user = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        };
        return { errors, user };
    }
    return { errors: null, user: null };
}

