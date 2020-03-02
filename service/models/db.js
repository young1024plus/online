var mongoose = require('mongoose');   //导入库
mongoose.connect('mongodb://127.0.0.1:27017/news',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}); // 连接数据库

module.exports = mongoose;