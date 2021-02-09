const express = require('express');
const validateRouter = express.Router();
const jwt = require ('jsonwebtoken');

adminusername='admin@qs.com';
adminpassword='12345678';

const Userdata = require('../model/Userdata');

function router() {
    // SIGN UP
    validateRouter.post('/signUp',function(req,res){
       console.log(req.body);
       let userData = req.body;
       var user = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
       }
       var user = Userdata(user);
       user.save(); //save to DB
       res.status(200).send({"message": "Data recieved"});
    })
     // SIGN IN
    validateRouter.post('/signIn',function(req,res){
        console.log(req.body);
        let email =req.body.email;
        let password =req.body.password;   
    
       Userdata.findOne({email:email})
       .then(function(user){
             var id=user._id;
             console.log("User ID - ",id);
             if(user.password == password)
             {           
               // res.status(200).send({"message": "Valid User"});
              let payload = {subject: email + password};
              let token = jwt.sign(payload,'secretKey');
              res.status(200).send({token,id});
               }
    
             else{
                res.status(401).send('Invalid Credentials');
                }
        })
        .catch( ()=> {
    
                res.status(404).send({"message": "User not found! Please SIGN UP!"});
      });
    })

    validateRouter.post('/adminLogin',(req,res) => {
      console.log(req.body);
      let userData = req.body;
  
      if(adminusername !== userData.email){
          res.status(404).send('Invalid Username');
      }
      else if (adminpassword !== userData.password){
          res.status(401).send('Invalid Password');
      }
      else{
          console.log('Validation Success!');
          let payload = {subject: adminusername + adminpassword};
          let token = jwt.sign(payload,'secretKey');
          res.status(200).send({token});
      }
  });
        

    return validateRouter;
}

module.exports = router;