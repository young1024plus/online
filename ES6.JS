var person = {}

let p1  = 'zhang'

function test(){
    let a = 1;
}
//console.log(a)


const b = 2;
//b = 3;


var obj = {
    test:function(){

    },

    test2:()=>{

    },

    test3: res => {

    },

    test4:(err,res)=>{

    },
}


//commonJs  
// module.exports     require

var temp = 10;
var num  = 12;

var str = "temp="+temp+",num="+12;

var str2 = `temp=${temp},num=${num}`;

var pp = new Promise((resolve,reject)=>{
    // resolve('aaaa')
    reject('bbb')
})
pp.then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
})