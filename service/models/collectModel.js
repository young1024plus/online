var mongoose = require('./db');

var schema = mongoose.Schema({  //创建 schema
    uid: String,  //用户id
    aid:{type: mongoose.Schema.Types.ObjectId, ref: 'news'},  //文章id
},{collection:'collect'})  //指定集合
var model = mongoose.model('collect',schema);  //创建model

module.exports = model;