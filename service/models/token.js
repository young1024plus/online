var mongoose = require('./db');

var tokenSchema = mongoose.Schema({  
    token:String
    //userid 
},{collection:'tokens'})  
var tokenModel = mongoose.model('tokens',tokenSchema);

module.exports = tokenModel;