const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customerID: {type: Number, unique: true},
    customerName: String,
    feePerHour: Number,
    currentBalance: Number,//user can fill their balance
    timeSlots: Number, //how many hours customer purchased
    startTime: Date, //start time for current login
    age: Number, //Gotta be 21 to mess around your consciousness
    doses: [String], //for drugs injection
    genomeKeys: String, //for internet cafe to request genome data from data providers to adjust drugs dose and
                         // experience intensities based on individual's DNA
    nutritionCondition: Number,
    hydrationCondition: Number, //customers often stay in the cafe for 12 to 24 hours
    currentVirtualLocation: String
});

const Customer = mongoose.model("Customer", customerSchema);
mongoose.connect("mongodb://localhost:27017/FIC");

module.exports = Customer; // this is what you want
