const { body } = require('express-validator');
const { validationResult } = require('express-validator');

exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty.').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty.').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({ min: 8, max: 64 })];

exports.validateLogIn = [body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({ min: 8, max: 64 })];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
};

exports.validateConnection = [body('title').notEmpty().withMessage('The title cannot be empty.').trim().escape(),
body('topic').notEmpty().withMessage('The topic cannot be empty.').trim().escape(),
body('details').notEmpty().withMessage('The details cannot be empty.').trim().escape(),
body('date').isDate().withMessage('The date must be a valid date.').isAfter().withMessage('The date must be after today.').notEmpty().withMessage('The date cannot be empty.').trim().escape(),
body('startTime').matches('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$').withMessage('The start time must be a valid time.').notEmpty().withMessage('The start time cannot be empty.').trim().escape(),
body('endTime').matches('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$').withMessage('The end time must be a valid time.').notEmpty().withMessage('The end time cannot be empty.').trim().escape().custom((value, { req }) => {
    if (req.body.startTime > req.body.endTime) {
        throw new Error('The start time cannot be after the end time.');
    }
    return true
}),
body('location').notEmpty().withMessage('The location cannot be empty.').trim().escape()
];

exports.validateRSVP = [
    body('status').toLowerCase().notEmpty().withMessage('The RSVP status cannot be empty.').isIn(['yes', 'no', 'maybe']).withMessage('The Status must be yes, no, or maybe.')
];