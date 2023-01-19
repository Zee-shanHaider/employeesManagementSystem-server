
const express = require('express')
const {check} = require('express-validator/check')
const Employee = require('../models/employee')
const router = express.Router()
const employeeController = require('../controllers/employeeController')
const employeeValidation = require('./employeeValidation')
const imageUpload = require('../middlewares/imageUpload')
const isAuth = require('../middlewares/isAuth')

router.get('/:id',employeeController.getEmployee)

router.get('/', isAuth,async (req,res)=>{
    try {
        const response = await employeeController.getEmployees()
        if(response && response.length > 0){
            res.status(200).send(response
            )
        }else{
            res.status(201).send({
                message: "no employe found"
            })
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
})

router.delete('/:id',isAuth, employeeController.deleteEmployee)

router.post('/', imageUpload.uploads ,employeeValidation.employeeValidator()
    
,employeeController.postEmployee)

router.put('/:id', employeeController.updateEmployee);

module.exports = router;