const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require('path')
const crytpo = require("crypto");

const usermodel = require('./models/userModel');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'public','avatar'))
    },
    filename: function (req, file, cb) {
        var arr = file.originalname.split('.')
        cb(null, Date.now()+'.'+arr[arr.length-1])
    }
})
var upload = multer({ storage: storage })
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public','avatar')))


app.post('/sign',upload.single('avatar'),(req,res)=>{
    var username = req.body.username;
    var pw = req.body.password;
    var avatar = req.file.filename;
    if(username && pw && avatar){ 
        var md5 = crytpo.createHash("md5"); 
        var md5Sum = md5.update(pw);    
        var password = md5Sum.digest('hex'); 

        var user = new usermodel({
            username,
            password,
            avatar
        })

        user.save((err,u)=>{
            if(err){
                res.json({
                    status:'fail',
                    msg:"注册失败",
                    data:err
                })
                //fs.unlink
            }else{
                res.json({
                    status:'success',
                    msg:"注册成功",
                    data:u
                })
            }
        })
    }else{
        res.json({
            status:'fail',
            msg:"注册失败",
            data:''
        })
    }

})


app.post('/login',(req,res)=>{
    var uname = req.body.username;
    var pw =  req.body.password;
    console.log(uname)
    console.log(pw)
    if(uname && pw){
        var md5 = crytpo.createHash("md5"); 
        var md5Sum = md5.update(pw);    
        var password = md5Sum.digest('hex'); 

        usermodel.find({username:uname,password:password},(err,us)=>{ 
            // res.json({us:us})
            if(us.length>0){
                res.json({
                    status:'success',
                    msg:"登录成功",
                    data: us[0]
                })
            }else{
                res.json({
                    status:'fail',
                    msg:"登录失败",
                    data:'用户名或者密码错误'
                })
            }

        })


    }else{
        res.json({
            status:'fail',
            msg:"登录失败",
            data:'缺少参数'
        })
    }
    
})





app.listen(82)