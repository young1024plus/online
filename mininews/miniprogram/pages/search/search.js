// miniprogram/pages/search/search.js

var req = require('../../util/req.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    list:[]
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
  savekey:function(e){
    this.setData({
      keyword: e.detail.value
    })
  },
  search:function(){
    var that = this;
    req('/search',{
      keyword: that.data.keyword
    },function(res){
      that.setData({
        list: res.data.data
      })
    })
  },
  goinfo: function (e) {
    wx.navigateTo({
      url: '/pages/info/info?newsid=' + e.currentTarget.dataset.newsid,
    })
  }
})