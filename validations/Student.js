const { check, validationResult  } = require('express-validator/check');

exports.NewStudent = (req, res, next) => {
    req.check('name', 'The name field is required').notEmpty();
    req.check('name', 'The name field should be minimum 5 character').isLength({ min:5 });
    req.check('email', 'The email field is required').notEmpty();
    req.check('email', 'The email field is invalid').isEmail();
    var errors = req.validationErrors();
    // console.log(errors);
    // var ss = errors.map( err => {
    //     return {
    //         [err.param] : err.msg
    //     }
    // });
    // console.log(ss);
    // if (errors.length > 0) {
    //     return res.status(422).json({ status: 422, error: ss, response: null });
    // }
    // next(); 
     
    if (errors.length > 0) {
        return res.status(422).json({ status: 422, error: errors, response: null });
    }
    next();          
};

exports.UpdateStudent = (req, res, next) => {
    req.check('name', 'The name field is required').notEmpty();
    req.check('name', 'The name field should be minimum 5 character').isLength({ min:5 });
    req.check('email', 'The email field is required').notEmpty();
    req.check('email', 'The email field is invalid').isEmail();
    var errors = req.validationErrors();
    if (errors.length > 0) {
        return res.status(422).json({ status: 422, error: errors, response: null });
    }
    next();    
};