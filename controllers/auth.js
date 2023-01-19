const Employee = require('../models/employee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.login = async(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user =await Employee.findOne({where: {email: email}});
    if(!user){
        const error = new Error('User does not exist');
        error.statusCode = 404;
        next(error)
    }
    let loadedUser = user;
    const doMatch = await bcrypt.compare(password, user.password)
        if(doMatch){
            const token = jwt.sign({
                email: loadedUser.email,
                userId:loadedUser.id.toString()
            },
            'thisIsTheSecretKeyPart',
            {
                expiresIn:'3600000'
            }
        )
            res.status(201).json({
                'result': 'User successfully loged in',
                token:token,
                user: loadedUser,
            })
    }
        else{
           const error = new Error('Password does not match');
           error.statusCode = 400;
           next(error); 
        }
}