const exp =  require('express');
const path = require('path');
const bodyparser = require('body-parser');  //引用依赖库 


const app = exp();  // 获取app实例

// use方法使用中间件 
app.use(exp.static(path.join(__dirname,'public')))  //配置静态目录
app.use(bodyparser.urlencoded({extended:true})) //获取post参数


// 设置模板引擎   设置模板目录
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/test1/:id',(req,res)=>{
    var getid = req.params.id; // 获取get请求的配置参数
    console.log(getid)
    res.send('ok')
})

app.get('/user',(req,res)=>{
    console.log(req.query.username)  // 获取 get表单参数
    res.send('ok!')
})



//post 请求
app.post('/getp',(req,res)=>{
    console.log(req.body)  // 获取post请求参数
    res.send('post ok')
})

app.get('/test3',(req,res)=>{
    res.send('<h2>test</h2>')
})

app.get('/test4',(req,res)=>{
    res.json({
        name: 'young',
        age:21
    })
})



app.get('/down',(req,res)=>{
    res.download('./ES6.JS')
})

app.get('/send',(req,res)=>{

    var filepath = path.join(__dirname,'ES6.JS')
    //必须要使用绝对路径
    res.sendFile(filepath)
})

app.get('/re',(req,res)=>{
    res.redirect('/test4')
})

app.get('/ejs',(req,res)=>{
    var list = [
        {name:'y1'},
        {name:'y2'},
        {name:'<h2>y3</h2>'},
        {name:'y4'},
    ]

    res.render('index',{list:list})
})

/*
    send  //返回字符串,
    json  // 返回json
    render  // 返回模板
    download  //下载文件
    sendFile  // 返回文件内容
    redirect  // 重定向
*/

// supervisor
// pm2

/*
    文件 == id  name  文件名称
    pm2 start 文件  // 启动
    pm2 stop 文件  //停止

    pm2 restart 文件 //重启
    
    pm2 start 文件 --watch // 启动并且监听 改动自动重启
*/














app.listen(82,function(){
    console.log('服务器已启动..')
})