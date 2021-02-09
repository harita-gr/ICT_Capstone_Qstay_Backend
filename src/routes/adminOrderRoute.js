const express = require('express');
const orderRouter = express.Router();
const jwt = require ('jsonwebtoken');

const Orderdata = require('../model/Orderdata');

function router() {

    orderRouter.get('/getList',function(req,res){
        Orderdata.find()
        .then(function(orders){
            res.send(orders);
        });
    })

    orderRouter.get('/getCount',function(req,res){
        Orderdata.countDocuments({})
          .then((count)=>{
              console.log('Order count:',count);
              res.send({count});
          });
    })

    orderRouter.get('/getLatestList',function(req,res){

        Orderdata.find({}).sort({_id: -1}).limit(3).then((orders) => {
          console.log('Orders',orders);
          res.send(orders);
      })
  
      })
  
      
    orderRouter.get('/getInterstateCount',function(req,res){
        Orderdata.countDocuments({from: "interstate"})
          .then((count)=>{
              console.log('Order count:',count);
              res.send({count});
          });
    })

    
    orderRouter.get('/getInternationalCount',function(req,res){
        Orderdata.countDocuments({from: "international"})
          .then((count)=>{
              console.log('Order count:',count);
              res.send({count});
          });
    })

    return orderRouter;
}

module.exports = router;