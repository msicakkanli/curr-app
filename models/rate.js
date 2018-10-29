const mongoose = require('mongoose');

var RateSchema = new mongoose.Schema({
    currencyName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    buy: {
        type: Number,
        required: true,
        trim: true 
    },
    sell: {
        type: Number,
        required: true,
        trim: true 
    },
    currencyCode: {
        type: String,
        required:true
    }
});

var Rate = mongoose.model('Rate', RateSchema);
module.exports = Rate; 