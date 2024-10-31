const db = require("../models");


exports.createReview = async function (req, res) {
    const burgerId = req.params.burgerId;
    const burger = await db.burgers.findByPk(burgerId);

    
    res.render('reviews/form.ejs', { review: null, errors: null, burger: burger });
    
}

exports.insertReview = async function (req, res) {
    const burgerId = req.params.burgerId;
    const burger = await db.burgers.findByPk(burgerId);
    const { errors, review } = validateReviewForm(req);

    if (errors) {
        res.render('reviews/form.ejs', { review: review, errors: errors, burger: burger });
        return;
    }

    const existingReview = await db.reviews.findOne({
        where: {
            user_id: req.session.user.id,
            burger_id: burgerId
        }
    });

    if (existingReview) {
        res.render('reviews/form.ejs', { review: review, errors: { review: 'Ya has dado una reseña para esta hamburguesa' }, burger: burger });
        return;
    }
    try{
        db.reviews.create({
            review: req.body.review,
            qualification: req.body.qualification,
            user_id: req.session.user.id,
            burger_id: burgerId
        });
        res.redirect(`/burgers/${burgerId}/detail`);
    }catch (error) {
        console.error('Error al insertar la reseña:', error);
        res.status(500).send('Error del servidor');
    }
}
const validateReviewForm = function (req) {
    if (!req.body.review || !req.body.qualification) {
        const errors = {
            review: !req.body.review,
            qualification: !req.body.qualification
        };
        errors.message = 'All fields are required';
        const review = {
            review: req.body.review,
            qualification: req.body.qualification
        };
        return { errors, review };
    }
    return { errors: null, review: null };
}

