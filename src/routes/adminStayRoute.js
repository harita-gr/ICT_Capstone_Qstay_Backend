const express = require('express');
const Staydata = require('../model/Staydata');
const stayRouter = express.Router();

function router() {

    stayRouter.post('/addStay',function(req,res){
        console.log(req.body);
        let stayData = req.body;
        var stay = {

         hotelName:stayData.hotelName,
         district:stayData.district,
         rating:stayData.rating,
         address:stayData.address,
         price:stayData.price,
         image:stayData.image,
         distanceFromAirport:stayData.distanceFromAirport,
         type:stayData.type,
         noOfRooms:stayData.noOfRooms,
         facilities:stayData.facilities

        }
        var stay = Staydata(stay);
        stay.save(); //save to DB
        res.status(200).send({"message": "Data recieved"});
    });

    stayRouter.get('/getList',function(req,res){
        Staydata.find()
        .then(function(stays){
            res.send(stays);
        });
    })

    stayRouter.get('/getStay/:id',function(req,res){
        const id = req.params.id;
        Staydata.findOne({"_id":id})
          .then((stay)=>{
              res.send(stay);
          });
    })

    stayRouter.post('/updateStay/:id',function(req,res){
        const id = req.params.id;
        console.log('Updating - ', req.body);
        let stayData = req.body;
        var update = Staydata.findByIdAndUpdate(id,{
            hotelName:stayData.hotelName,
            district:stayData.district,
            rating:stayData.rating,
            address:stayData.address,
            price:stayData.price,
            image:stayData.image,
            distanceFromAirport:stayData.distanceFromAirport,
            type:stayData.type,
            noOfRooms:stayData.noOfRooms,
            facilities:stayData.facilities
       });
       update.exec(function (err,data){
        res.status(200).send(data);
      });
    })

    stayRouter.delete('/deleteStay/:id',(req,res)=>{
   
        id = req.params.id;
        Staydata.findByIdAndDelete({"_id":id})
        .then(()=>{
            console.log('Success')
            res.status(200).send('Successfully deleted stay');
        })
      });

    return stayRouter;
}

module.exports = router;