
var req = require('../../util/req.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    collectStatus: false,
    newsid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.newsid)
    this.setData({
      newsid: options.newsid
    })

    var that = this;
    req('/newsinfo', { newsid: options.newsid},function(res){
      // console.log(res)
      that.setData({
        info: res.data.data
      })
    },function(err){
      console.log(err)
    })
    var userstr = wx.getStorageSync('user');
    try{
      var user = JSON.parse(userstr)
    }catch(err){
    }
    
    if(userstr){
      req('/checkcollect', {
        newsid: options.newsid,
        uid: user.userinfo._id
      },
        function (res) {
          that.setData({
            collectStatus: res.data.data
          })
        },
        function (err) {
        }
      )
    }
    




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
    return {
      title:'热点新闻',
      path:'/pages/index/index?page=info&newsid='+this.data.newsid
    }
  },

  collect:function(){
    var that = this;

    var userstr = wx.getStorageSync('user');
    var user ;
    try{
      user = JSON.parse(userstr);
    }catch(err){

    }

   
    
    if(user){
      req('/collect', {
        uid: user.userinfo._id,
        aid: that.data.newsid
      },
        function (res) {
          if (res.data.status == "success") {
            that.setData({
              collectStatus: true
            })
          }
        },
        function (err) {
          console.log(err)
        }
      )
    }else{
      wx.showToast({
        title: '需要登录',
        icon: 'none',
        duration:2000,
        success:function(){
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/login/login?page=info&newsid='+that.data.newsid,
            })
          },2000)
        }
      })
    }
    



    
  },

  cancelCollect: function(){
    var that = this;

    var userstr = wx.getStorageSync('user');
    var user = JSON.parse(userstr)
    req('/cancelCollect', {
      uid: user.userinfo._id,
      aid: that.data.newsid
    },
      function (res) {
        if (res.data.status == "success") {
          that.setData({
            collectStatus: false
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  }


})