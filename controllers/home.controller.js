const sha1 = require('sha1'); 
const db = require('../models'); 

exports.concatenar = async function(req, res) {
    //eslint-disable-next-line no-undef
    res.sendFile(__dirname + '/views/index.html')
}
exports.login = async function (req,res) {
    res.render('user/login.ejs', { user: null, errors:null });
}

exports.authenticate = async function(req, res){
    const user = await db.users.findOne({
        where: {
            email: req.body.email,
            password: sha1(req.body.password)
        }
    });
    if(user){
        req.session.user = user;
        if(user.role === 'admin'){
            console.log('entro admin')
            return res.redirect('/restaurants');
        }
        res.redirect('/restaurants');
    } else {
        res.render('user/login.ejs', { 
            user: req.body, 
            errors: { message: 'Email or password incorrect' }
        });
    }
}
exports.logout = async function(req, res){
    //req.session.destroy();
    req.session.user = null;
    res.redirect('/login');
}
exports.index = async function (req, res) {
    res.render('dashboard.ejs');
}



