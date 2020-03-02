var axios = require('axios');
var iconv = require('iconv-lite');
var cheerio = require('cheerio')

var newsmodel = require('./models/newsModel')

axios({
    url:'https://new.qq.com/ch/finance/',
    method:'get',
    responseType:'arraybuffer'
}).then( res=>{
    let html = iconv.decode(res.data,'gb2312')
    // console.log(html)

    let $ = cheerio.load(html,{decodeEntities: false})

    // console.log( $('.list li').eq(2).find('a').attr('href'));
    let list = $('.list li');
    console.log(list.length)
    for(let i=0; i<list.length; i++){
        let newshref = $('.list li').eq(i).find('a').attr('href');

        axios({
            url: newshref,
            method:'get',
            responseType:'arraybuffer'
        }).then( res=>{
            // res 是bufer ,  要把buffer 转换成 文字
            // console.log(res)
            let html  = iconv.decode(res.data,'gb2312')
           
            let $1 = cheerio.load(html,{decodeEntities: false});
           
            let title = $1('.LEFT h1').html();
            
            let content = $1('.content-article').html()
        
        
            let pubtime;
            // try {
                let info = $1('script').eq(5).html();
                let info2 = info.split('=');
                let obj = JSON.parse(info2[1])
                let oldtime = obj.pubtime;
                let dd = new Date(oldtime) 
        
                pubtime = dd.getTime()
            // } catch (error) {
                // pubtime = new Date().getTime;
            // }
            
        
            let imgs = $1('.content-picture');
        
            let picture;
            if(imgs<0){
                picture = null;
            }else{
                picture = $1('.content-picture').eq(0).attr('src');
            }
            

            let media;
            
            // try {
                media = obj.media;
            // } catch (error) {
                // media = '腾讯'
            // }


            
            let source = newshref;
            let type = '财经';


            let news = newsmodel({
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
                    console.log( i+ ':保存成功')
                }
            })
            
        })
        




    }



})


