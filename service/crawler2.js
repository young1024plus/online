var axios = require('axios');
var iconv = require('iconv-lite');
var cheerio = require('cheerio')

// axios.get('https://www.sohu.com/a/375609887_114731?g=0?code=592c5b2de7e5836a274a0fdc2ceb93d5').then( res=>{
//     console.log(res.data)
// })

// axios.get('https://new.qq.com/omn/20200225/20200225A06X0D00.html').then(res=>{
//     console.log(res)
// })

axios({
    url:'https://new.qq.com/omn/20200225/20200225A06X0D00.html',
    method:'get',
    responseType:'arraybuffer'
}).then( res=>{
    // res 是bufer ,  要把buffer 转换成 文字
    // console.log(res)
    var html  = iconv.decode(res.data,'gb2312')
    // console.log(html)

    var $ = cheerio.load(html,{decodeEntities: false});
   
    var title = $('.LEFT h1').html();
    
    var content = $('.content-article').html()




    var info = $('script').eq(5).html();
    var info2 = info.split('=');
    var obj = JSON.parse(info2[1])
    var oldtime = obj.pubtime;
    var dd = new Date(oldtime) 

    var pubtime = dd.getTime()

    var imgs = $('.content-picture');

    var picture;
    if(imgs<0){
        picture = null;
    }else{
        picture = $('.content-picture').eq(0).attr('src');
    }


    var media = obj.media;
    var source = 'https://new.qq.com/omn/20200225/20200225A06X0D00.html';
    var type = '新闻'

})

/*

    标题
    内容
    时间  如果文章中有时间就爬取文章中的时间,  如果没有时间,就选择当前时间    ;   要以时间戳表示
    头图  文章中选取, 如果没有就null ''
    来源
    原文地址 
    类别

*/


