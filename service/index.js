//初始化 node项目   npm init

// console.log('aaa')

console.log(__dirname)

console.log(__filename)

//  /  \

const path = require('path');

var imgpath = path.join(__dirname,'test','img');
console.log(imgpath)