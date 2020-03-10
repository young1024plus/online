
var req = require('../../util/req.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    pw:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  checkusername:function(e){
    this.setData({
      username: e.detail.value
    })
  },
  checkpw: function (e) {
    this.setData({
      pw: e.detail.value
    })
  },
  login:function(){
    var that = this;
    // wx.request({
    //   url: 'http://www.young1024.com:82/login',
    //   method:'post',
    //   data:{
    //     username:that.data.username,
    //     password : that.data.pw
    //   },
    //   success:function(res){
    //     console.log(res)
    //   },
    //   fail:function(err){
    //     console.log(err)
    //   }
    // })

    req('/login',{
      username:that.data.username,
      password : that.data.pw
    },
    function(res){
      console.log(res)
    },
    function(err){
      console.log(err)
    }
    )

  }
})