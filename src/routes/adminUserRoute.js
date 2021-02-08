const express = require('express');
const validateRouter = express.Router();

const Userdata = require('../model/Userdata');
const Staydata = require('../model/Staydata');

function router() {

    validateRouter.get('/getList',function(req,res){
        Userdata.find()
        .then(function(users){
            res.send(users);
        });
    })

    validateRouter.get('/getUser/:id',function(req,res){
        const id = req.params.id;
        Userdata.findOne({"_id":id})
          .then((user)=>{
              res.send(user);
          });
    })

    validateRouter.post('/updateUser/:id',function(req,res){
        const id = req.params.id;
        console.log('Updating - ', req.body);
        var update = Userdata.findByIdAndUpdate(id,{
            name:req.body.name,
            phone:req.body.phone,
            email: req.body.email,
       });
       update.exec(function (err,data){
        res.status(200).send(data);
      });
    })


    validateRouter.delete('/deleteUser/:id',(req,res)=>{
   
        id = req.params.id;
        Userdata.findByIdAndDelete({"_id":id})
        .then(()=>{
            console.log('Success')
            res.status(200).send('Successfully deleted user');
        })
      });

      validateRouter.get('/searchStay',(req,res) => {

        data = req.body;
        console('Search params:',data);

      })



    return validateRouter;
}

module.exports = router;