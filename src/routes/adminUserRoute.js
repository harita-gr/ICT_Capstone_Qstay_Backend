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


      validateRouter.get('/getCount',function(req,res){
        Userdata.countDocuments({})
          .then((count)=>{
              console.log('Order count:',count);
              res.send({count});
          });
    })

    
    validateRouter.get('/getLatestList',function(req,res){
      // Userdata.find({}, {}, { sort: { 'created_at' : -1 }},{limit:3})
      // .then(function(users){
      //   console.log('Users',users);
      //     res.send(users);
      // });
      // var users = Userdata.find().sort({$natural:-1}).limit(3);
      // console.log('Users',users);
      // res.send(users).status(200);    

      Userdata.find({}).sort({_id: -1}).limit(3).then((users) => {
        console.log('Users',users);
        res.send(users);
    })

    })


    return validateRouter;
}

module.exports = router;