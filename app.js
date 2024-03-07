require('dotenv').config();
const path = require('path')
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser')

const viewRouter = require('./routes/viewRoutes');
const userRouter = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({ extended: true }));

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
//init database
require('./database/initMongoDb');

//init routes
app.use('/', viewRouter);
app.use('/user', userRouter);
//error handling
//this is middleware with 3 parameter
// app.use((req,res,next)=>{
//     const error = new Error('not found')
//     error.status = 404
//     next(error)
// })

// error management with 4 parameter
// app.use((error,req,res,next)=>{
//     const statusCode = error.status || 500
//     return res.status(statusCode).json({
//         status:'error',
//         code:statusCode,
//         message:error.message || 'Internal Server Error'
        
//     })
// })

module.exports=app
