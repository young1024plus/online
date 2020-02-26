var mongoose = require('./db');


/*

    标题  title
    内容  content
    时间  pubtime
    头图  picture
    来源 media
    原文地址  source
    类别 type
*/

var newsSchema = mongoose.Schema({  //创建 schema
    title:String,
    content: String,
    pubtime:String,
    picture: String,
    media:String,
    source:String,
    type: String
},{collection:'news'})  //指定集合
var newsModel = mongoose.model('news',newsSchema);  //创建model


module.exports = newsModel;