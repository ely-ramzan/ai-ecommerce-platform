const {body,validationResult} = require("express-validator");

const userRegistrationValidator = [
    
    body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({min:2}).withMessage('Name is required'),

    body('email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

     body('phone')
    .notEmpty().withMessage('Phone number is required.')
    .isMobilePhone('any', { strictMode: false }).withMessage('Please provide a valid phone number.'),

    body('password')
    .isLength({min:8}).withMessage('Password must be atleast 8 chars long'),
    

    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({"errors":errors.array()});
        }
        next();
    }

]


module.exports = {
    userRegistrationValidator
};