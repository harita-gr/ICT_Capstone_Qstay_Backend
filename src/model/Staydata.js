const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.akfoz.mongodb.net/qstayapp?retryWrites=true&w=majority');

//Schema
const Schema = mongoose.Schema;

const StaySchema =  new Schema({
     hotelName:String,
     district:String,
     rating:String,
     address:String,
     price:String,
     image:String,
     distanceFromAirport:String,
     type:String,
     noOfRooms:Number,
     facilities:Array
});

//Model
var Staydata = mongoose.model('staydata',StaySchema);

module.exports = Staydata;

