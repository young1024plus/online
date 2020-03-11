const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const path = require('path')
const crytpo = require("crypto");
const jwt = require('jsonwebtoken');


const usermodel = require('./models/userModel');
const tokenmodel = require('./models/token');
const newsmodel = require('./models/newsModel');
const collectmodel = require('./models/collectModel');



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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));


// 允许跨域
app.use(
    function(req,res,next){
        res.header({ 
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With',
            'Access-Control-Allow-Methods': 'POST'//,GET,OPTIONS,PUT,DETELE
        })
        next();
    }   
)

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

    //登录成功 返回 token (用户信息,过期时间)
    // session  
    var uname = req.body.username;
    var pw =  req.body.password;

    if(uname && pw){
        var md5 = crytpo.createHash("md5"); 
        var md5Sum = md5.update(pw);    
        var password = md5Sum.digest('hex'); 

        usermodel.find({username:uname,password:password},(err,us)=>{ 
            // res.json({us:us})
            if(us.length>0){
                
                
                // console.log(token)

                // var decode = jwt.verify(token,'secret');
                // console.log(decode)
                
                // console.log(us[0])

                var userinfo = {
                    _id : us[0]._id,
                    username : us[0].username,
                    avatar: us[0].avatar
                }

                var token = jwt.sign(
                    userinfo, 
                    'secret', 
                    { expiresIn: '7d' }
                )
                
                var token2 =  new tokenmodel({
                    token
                })

                token2.save((err,tt)=>{
                    res.json({
                        status:'success',
                        msg:"登录成功",
                        data:{
                            token,
                            userinfo
                        }
                    })
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

app.post('/status',(req,res)=>{
    var token = req.body.token
    tokenmodel.findOne({token},(err,ts)=>{
        if(ts){ 
            

            try {
                var decode = jwt.verify(token,'secret');
            } catch (error) {
                res.json({
                    status:'fail',
                    msg:"登录过期",
                    data: error
                })
            }
            if(decode){
                res.json({
                    status:'success',
                    msg:"查询成功",
                    data: decode
                })
            }else{
                res.json({
                    status:'fail',
                    msg:"登录过期",
                    data: ''
                })
            }
            
            
           
            
        }else{
            res.json({
                status:'fail',
                msg:"登录失效",
                data: ''
            })
        }  
    })
})

app.post('/news',(req,res)=>{
    var type = req.body.type;
    var size = req.body.size? parseInt(req.body.size):20;
    var page = req.body.page?parseInt(req.body.page):1;
    // console.log(type)
    // console.log(size)
    // console.log(page)
    
    if(type){

        newsmodel.find({type},'_id title pubtime media type picture').limit(size).skip(size*(page-1)).exec((err,ns)=>{
            
            if(err){
                res.json({
                    status:'fail',
                    msg:'查询失败',
                    data:''
                })
            }else{
                res.json({
                    status:'success',
                    msg:'查询成功',
                    data:ns
                })
            }
            
        })
    
    }

    

    // newsmodel.find({type:'财经'}).limit('5').skip('5').exec((err,ns)=>{
    //     console.log(ns)
    //     res.send('ok')
    // });


})

app.post('/search',(req,res)=>{
    var keyword = req.body.keyword;
    var size = req.body.size? parseInt(req.body.size):20;
    var page = req.body.page?parseInt(req.body.page):1;
       
    if(keyword){

        newsmodel.find({title:{$regex : new RegExp(keyword,'ig')}},'_id title pubtime picture media type').limit(size).skip(size*(page-1)).exec((err,ns)=>{
            
            if(err){
                res.json({
                    status:'fail',
                    msg:'查询失败',
                    data:''
                })
            }else{
                res.json({
                    status:'success',
                    msg:'查询成功',
                    data:ns
                })
            }
            
        })
    
    }
})

app.post('/newsinfo',(req,res)=>{
    var newsid = req.body.newsid;
    if(newsid){
        newsmodel.findById(newsid,(err,news)=>{
            if(err){
                res.json({
                    status:'fail',
                    msg:'查询失败',
                    data:''
                })
            }else{
                res.json({
                    status:'success',
                    msg:'查询成功',
                    data:news
                })
    
            }
            
        })
    }else{
        res.json({
            status:'fail',
            msg:'缺少id',
            data:''
        })
    }
})


app.post('/collect',(req,res)=>{
    var uid = req.body.uid;  //用户id
    var aid = req.body.aid;  //新闻id
    if(uid && aid){
        var coll = new collectmodel({
            uid,
            aid
        })
        coll.save((err,cnews)=>{
            if(err){
                res.json({
                    status:'fail',
                    msg: '收藏失败',
                    data: err  //err 不应该暴露出去  , 应该写日志
                })
            }else{
                res.json({
                    status:'success',
                    msg:'收藏成功',
                    data: cnews
                })
            }
        })
    }else{
        res.json({
            status:'fail',
            msg: '收藏失败',
            data: '缺少参数'
        })
    }
})

app.post('/cancelCollect',(req,res)=>{
    var uid = req.body.uid;
    var aid = req.body.aid;
    if(uid && aid){
        collectmodel.remove({uid,aid},(err,delnews)=>{
            if(err){
                res.json({
                    status:'fail',
                    msg: '取消收藏失败',
                    data: err
                })
            }else{
                res.json({
                    status:'success',
                    msg: '取消收藏成功',
                    data: 'del:' + delnews.deletedCount
                })
            }
        })

    }

})


app.post('/clist',(req,res)=>{
    var uid = req.body.uid;
    if(uid){
        collectmodel.find({uid}).populate('aid','_id title pubtime picture media source type').exec((err,cs)=>{
            if(err){
                res.json({
                    status:'fail',
                    msg: '查询失败',
                    data: err
                })
            }else{
                res.json({
                    status: 'success',
                    msg : '查询成功',
                    data : cs
                })
            }
        }) 
    }else{
        res.json({
            status:'fail',
            msg:'缺少uid',
            data: ''
        })
    }
})


app.post('/checkcollect',(req,res)=>{
    let newsid = req.body.newsid;
    let uid = req.body.uid;
    if(newsid&&uid){
        collectmodel.find({aid:newsid,uid:uid},(err,as)=>{
            if(err){
                res.json({
                    status:'fail',
                    msg: '查询失败',
                    data: err
                })
            }else{

                if(as.length>0){
                    res.json({
                        status:'success',
                        msg: '已经收藏',
                        data: true
                    })
                }else{
                    res.json({
                        status:'success',
                        msg: '未收藏',
                        data: false
                    })
                }


            }

        })
    }else{
        res.json({
            status:'fail',
            msg: '查询失败',
            data: '文档id或者用户id不能为空'
        })

    }
})



app.listen(82)