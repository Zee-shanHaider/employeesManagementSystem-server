const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

//Own Imports
const Employee = require('./models/employee');
const Department = require('./models/job')
const Salary = require('./models/salary')
const employeeRoutes = require('./routes/employee')
const authRoutes = require('./routes/authRoutes')
const errorController  = require('./controllers/error')
require('dotenv').config({path: 'config.env'});

const sequelize = require('./util/database')

const port = process.env.PORT;

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// db.execute('Select * from users')
// .then(users=> {
//     console.log(users[0])
// })
// .catch(err=>{
//     console.log(err)
// })

// app.get('/insert', (req,res)=>{
//     db.execute('INSERT INTO users(firstName,email,phoneNo) VALUES("Azam", "azam@gmail.com", 03125678544)')
//     .then(()=>{
//         console.log('record is inserted successfully!')
//         res.send('Record is inserted!')
//     })
//     .catch(err=>{
//         console.log('error is there', err)
//     })
// })

// app.get('/getRecord', (req,res)=>{
//     db.execute('Select * FROM users where email = ?',['abc@gmail.com'])
//     .then(user=>{
//         res.send(user[0])
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

app.post('/insert', async (req,res)=>{
   
})

app.post('/insertDepartment',async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const salaryRange = req.body.salaryRange;
    try{
        const depart = await Department.create({
            title: title,
            description: description,
            salaryRange: salaryRange
        })
        if(depart){
            res.status(201).json({message: 'Department created Successfully!'})
        }

    }
    catch(err){
        console.log(err)
    }
})
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/employee',employeeRoutes);
app.use(authRoutes)

app.use(errorController.get404)

app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    console.log('message', message)
    const data = error.data;
    console.log('data', data)
    res.status(status).send({
        message: message,
        data: data
    })
})


Department.hasMany(Employee)
Employee.belongsTo(Department)
// Department.hasMany(Salary)
// Salary.belongsToMany(Department,{through: Employee})




sequelize.sync()
.then(()=>{
    app.listen(port, ()=>{
        console.log("Server is running at "+port)
    })
})
.catch(err=>{
    console.log(err)
})