const express = require('express');
const bookingRouter = express.Router();

const Staydata = require('../model/Staydata');
const OrderData = require('../model/Orderdata');

function router() {

    bookingRouter.post('/searchStay',(req,res) => {

        console.log('Search params:',req.body);
        Staydata.find({district:req.body.district})
        .then(function(stays){
            res.send(stays);
        });
      })

      bookingRouter.get('/viewStay/:id',(req,res) => {

        const id = req.params.id;
        console.log('id: ',id)
        Staydata.findOne({"_id":id})
          .then((stay)=>{
              res.send(stay);
          });
    })

    bookingRouter.post('/placeOrder',(req,res) => {
        data = req.body;
        console.log('Search params:',data);      
        var order = {
            userId:data.userId,
            stayId:data.stayId,
            hotelName:data.hotelName,
            district:data.district,
            address:data.address,
            totalprice:data.totalprice,
            image:data.image,
            distanceFromAirport:data.distanceFromAirport,
            noOfDays:data.noOfDays,
            optMedical:data.optMedical,
            optTransport:data.optTransport,
            adultNo:data.adultNo,
            childNo:data.childNo   
        }
        var order = OrderData(order);
        order.save();
        res.status(200).send({"message": "Data recieved"});
      })


      bookingRouter.get('/getOrderList/:id',(req,res) => {

        const id = req.params.id;
        console.log('id:',id)
        OrderData.find({"userId":id})
          .then((order)=>{
              res.send(order);
          });
    })

return bookingRouter;
}

module.exports = router;