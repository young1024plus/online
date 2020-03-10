
var req = require('../../util/req.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    cur: 0,
    page:1,
    types: ['科技','财经']
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
    var that = this;
    req('/news',{type:that.data.types[0]},function(res){
      that.setData({
        list:res.data.data
      })   
    })
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
    var that = this;
    req('/news',{
      type: that.data.types[that.data.cur],
      page: that.data.page+1
    },function(res){
      // console.log(res.data.data)

      if(res.data.data.length>0){
        that.setData({
          page: that.data.page+1,
          list: [...that.data.list, ...res.data.data]
        })
      }

    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  swi:function(e){
    // console.log(e.currentTarget.dataset.index)
    var that = this;
    req('/news', { type: that.data.types[e.currentTarget.dataset.index] }, function (res) {
      that.setData({
        list: res.data.data,
        cur: e.currentTarget.dataset.index
      })
    })
  },

  goinfo:function(e){
    // console.log(e.currentTarget.dataset.newsid);
    wx.navigateTo({
      url: '/pages/info/info?newsid='+e.currentTarget.dataset.newsid,
    })

  }


})