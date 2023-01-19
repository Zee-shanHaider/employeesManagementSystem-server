const {check} = require('express-validator/check');
const Employee = require('../models/employee')

exports.employeeValidator = ()=>{
    console.log('this is a middleware')
   return [
        check('firstName')
        .notEmpty()
        .withMessage("field is required!"),

        check('lastName')
        .notEmpty()
        .withMessage("field is required!"),

        check('email','Email is invalid!')
        .isEmail()
        .normalizeEmail()
        .trim()
        .notEmpty()
        .custom((value,{req})=>{
            return Employee.findOne({where: {email: value}})
            .then(employee=> {
                if(employee) 
                return Promise.reject('email is already registered')
            })
        }),
        check('address')
        .not()
        .isEmpty()
        .withMessage('Address is required!'),

        check('phoneNo')
        .not()
        .isEmpty()
        .withMessage('Phone no is required!')
        .isNumeric()
        .withMessage("Phone no is not correct")
        
        // .custom((value,{req})=> {
        //     console.log('Phone No is ', value)
        //     if(!value.match(/^\d{10}$/))
        //     console.log('Invalid value is not a good error')
        // })
        .not()
        .isEmpty()
        .withMessage('Phone No is required!'),

        check('department')
        .not()
        .isEmpty()
        .withMessage('Address is required!'),

        check('password')
        .not()
        .isEmpty()
        .withMessage("Password is required!")
        .isLength({min: 4})
        .withMessage('Password is short'),

        check('confirmPassword')
        .notEmpty()
        .withMessage('Confirm Password is required')
        .custom((value, {req})=> value === req.body.password)
        .withMessage('Password does not match!')
    ]
}