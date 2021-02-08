const express = require('express');
const bodyParser = require ('body-parser');
const cors = require('cors');
// const jwt = require ('jsonwebtoken');

const PORT = 3000 || process.env.PORT;

const app =  express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({extended:true})); //for POST requests

//function to verify token

function verifyToken(req,res,next){

}
//Routers

const validateRouter = require('./src/routes/validateRoute') ();
const adminUserRouter = require('./src/routes/adminUserRoute') ();
const adminStayRouter = require('./src/routes/adminStayRoute')();
const bookRouter = require('./src/routes/bookingRoute')();

app.use('/user',validateRouter); 
app.use('/user/book',bookRouter); 
app.use('/admin/users',adminUserRouter);
app.use('/admin/stay',adminStayRouter);


app.get('/', function (req,res){
    res.send('Hello from server');
})

app.listen(PORT,function(){
    console.log("Server running on port:" + PORT);
});




