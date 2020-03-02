var mongoose = require('./db');

var userSchema = mongoose.Schema({  
    username:{type:String,index: true, unique: true,dropDups: true},
    password: String,
    avatar: String
},{collection:'users'})  
var userModel = mongoose.model('users',userSchema);

module.exports = userModel;