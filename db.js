//mongoose


var mongoose = require('mongoose');   //导入库
mongoose.connect('mongodb://127.0.0.1:27017/test'); // 连接数据库

var userSchema = mongoose.Schema({  //创建 schema
    name:String,
    age:Number
},{collection:'user'})  //指定集合
var userModel = mongoose.model('user',userSchema);  //创建model

/** 
//用model创建一个对象 这个对象有操作数据库的能力
var user = new userModel({
    name:'john3',
    age:23
})
//save 保存到数据库
user.save((err,uu)=>{
    console.log(err);
    console.log(uu)
})
*/


// find 查找 (查找条件)
// userModel.find({name:'john'},function(err,us){
//     console.log(us)
// })

//update 更新  (查找条件, 更新的字段)
// userModel.update({name:'john'},{name:'jj'},(err,user)=>{
//     console.log(user)
// })


// remove  删除   (查找条件)
userModel.remove({age:23},(err)=>{
    console.log('okk')
})

//http://www.mongoosejs.net/docs/index.html