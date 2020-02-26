var axios = require('axios');
var iconv = require('iconv-lite');
var cheerio = require('cheerio')

var newsmodel = require('./models/newsModel')

axios({
    url:'https://new.qq.com/ch/finance/',
    method:'get',
    responseType:'arraybuffer'
}).then( res=>{
    var html = iconv.decode(res.data,'gb2312')
    // console.log(html)

    var $ = cheerio.load(html,{decodeEntities: false})

    // console.log( $('.list li').eq(2).find('a').attr('href'));
    var list = $('.list li');
    for(var i=0; i<list.length; i++){
        var newshref = $('.list li').eq(i).find('a').attr('href');

        axios({
            url: newshref,
            method:'get',
            responseType:'arraybuffer'
        }).then( res=>{
            // res 是bufer ,  要把buffer 转换成 文字
            // console.log(res)
            var html  = iconv.decode(res.data,'gb2312')
           
            var $1 = cheerio.load(html,{decodeEntities: false});
           
            var title = $1('.LEFT h1').html();
            
            var content = $1('.content-article').html()
        
        
            var pubtime;
            try {
                var info = $1('script').eq(5).html();
                var info2 = info.split('=');
                var obj = JSON.parse(info2[1])
                var oldtime = obj.pubtime;
                var dd = new Date(oldtime) 
        
                pubtime = dd.getTime()
            } catch (error) {
                pubtime = new Date().getTime;
            }
            
        
            var imgs = $1('.content-picture');
        
            var picture;
            if(imgs<0){
                picture = null;
            }else{
                picture = $1('.content-picture').eq(0).attr('src');
            }
            

            var media;
            
            try {
                media = obj.media;
            } catch (error) {
                media = '腾讯'
            }


            
            var source = newshref;
            var type = '财经';


            var news = newsmodel({
                title,
                content,
                pubtime,
                picture,
                media,
                source,
                type
            })


            news.save((err,news)=>{
                if(err){
                    console.log('保存失败')
                }else{
                    console.log('保存成功')
                }
            })
            
        })
        




    }



})


