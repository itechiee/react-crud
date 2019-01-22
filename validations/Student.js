const { check, validationResult  } = require('express-validator/check');

exports.NewStudent = (req, res, next) => {
    req.check('name', 'name field is required').notEmpty();
    req.check('name', 'name field should be minimum 5 character').isLength({ min:5 });
    var errors = req.validationErrors();
    // const errors = validationResult(req);
    // console.log(errors);
    if (errors.length > 0) {
        return res.status(422).json({ 
            status: 422,
            error: errors,
            response: null });
    }
    next();
    
};