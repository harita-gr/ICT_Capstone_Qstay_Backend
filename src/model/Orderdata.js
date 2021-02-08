const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.akfoz.mongodb.net/qstayapp?retryWrites=true&w=majority');

//Schema
const Schema = mongoose.Schema;

const OrderSchema =  new Schema({
     userId:String,
     stayId:String,
     hotelName:String,
     district:String,
     address:String,
     totalprice:Number,
     image:String,
     distanceFromAirport:String,
     noOfDays:Number,
     optMedical:Boolean,
     optTransport:Boolean,
     adultNo:Number,
     childNo:Number     
});

//Model
var Orderdata = mongoose.model('orderdata',OrderSchema);

module.exports = Orderdata;

