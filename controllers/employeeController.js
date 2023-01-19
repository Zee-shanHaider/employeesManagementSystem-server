const { resolve } = require('path')
const Employee = require('../models/employee')
const Department = require('../models/job')
const {validationResult} = require('express-validator/check')
const bcrypt = require('bcryptjs')
const fileHelper = require('../util/file')

exports.getEmployee =async (req,res,next)=>{
    // console.log('url', req.url)
    // if(!req.url.includes('/getEmployee/'))
    // return res.status(500).send({message: 'Invalid url'})
    const id = req.params.id;
    try{
        const employee = await Employee.findOne({where: {id: id}})
        if(!employee)
        return res.status(404).send({message: 'Employee not found!'})
        if(employee){
            res.status(200).send(employee)
        }
    }
    catch(err){
        console.log(err)
    }

}
exports.deleteEmployee =async (req,res,next)=>{
    const id = req.params.id;
    if(!id){
        return res.status(401).send({message: "Employee id is undefined"})
    }
    const emp = await Employee.findOne({where: {id: id}})
    fileHelper.deleteFile(emp.imageUrl)
    try{
        const employee = await Employee.destroy({where: {id: id}})
        if(!employee)
        return res.status(404).send({message: "Employee not found!"})
        if(employee){
            console.log('employee in delete', employee)
            res.status(200).send({message: "Employee Deleted Successfully!"})
        }
    }
    catch(err){
        console.log(err)
    }

}

exports.getEmployees = () => {
    return new Promise(async (resolve,reject)=>{
        try {
            const employees = await Employee.findAll({
                include: [Department]
            })
            resolve(employees)
        } catch (error) {
            console.log(error.message)
            reject(error)
        }
    })
}

exports.updateEmployee = async (req,res)=>{
    const id = req.params.id;
        try{
            const employee = await Employee.findOne({where: {id: id}});
            if(!employee)
            return res.status(404).send({message: 'Employee doesn1t exist'})
            const updatedEmp = employee.update(req.body)
            if(updatedEmp)
            res.status(201).send({message: "Employee Updated Successfully!"})
}
catch(err){
    console.log(err)
}
}


// exports.updateEmployee = async (req,res)=>{
//     const id = req.params.id;
//     try{
//         const employee = await Employee.findOne({where: {id: id}});
//         if(!employee)
//         return res.status(404).send({message: 'Employee doesn1t exist'})
//         if(employee){
//             const fName = req.body.firstName;
//             const lName = req.body.lastName;
//             const email = req.body.email;
//             const address = req.body.address;
//             const phoneNo = req.body.phoneNo;
//             const department = req.body.department;
//             const response = await Department.findOne({where: {title: department}})
//             console.log(response)
//             // res.send(response)
//             if(!response)
//             return res.status(404).send({message: "Department not exists"})
//             if(response){
//                 employee.firstName = fName;
//                 employee.lName = lName;
//                 employee.email = email;
//                 employee.address = address;
//                 employee.phoneNo = phoneNo;
//                 employee.DepartmentId = response.id;
//                 const updateEmp =await employee.save()
//                 // const updateEmp = await Employee.update({
//                 //     firstName: fName,
//                 //     lastName: lName,
//                 //     email: email,
//                 //     address: address,
//                 //     phoneNo: phoneNo,
//                 //     DepartmentId: response.id,
//                 // })
//                 if(updateEmp){
//                     res.status(201).json({message: "Employee updated"})
//                 }
//         }
//     }}
//     catch(err){
//         console.log(err)
//     }
// }

exports.postEmployee = async (req,res)=>{
    const errors = validationResult(req);
    console.log('validation errors',errors.array().length >0)
    if(errors.array().length > 0){
     return  res.status(400).send({msg:errors.array(), status:'danger',code:400})
    }

    console.log(req.body)
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    const image = req.file;
    const address = req.body.address;
    const phoneNo = req.body.phoneNo;
    const department = req.body.department;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const hashedPassword =await bcrypt.hash(password, 12)
    console.log('image', image)
        try{
            const response = await Department.findOne({where: {title: department}})
            console.log(response)
            // res.send(response)
            if(!response)
            return res.status(404).send({message: "Department not found."})
            if(response){
                const newEmp = await Employee.create({
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    imageUrl: image.path,
                    address: address,
                    phoneNo: phoneNo,
                    DepartmentId: response.id,
                    password: hashedPassword
                    
                })
                if(newEmp){
                    res.status(200).json({message: "Employee created"})
                }
            }
        }
        catch(err){
            console.log(err)
        }

}
