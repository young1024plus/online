// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    loginStatus: false
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
    var userstr = wx.getStorageSync('user');
    try{
      var user = JSON.parse(userstr)
    }catch(err){

    }
    if(userstr){
      this.setData({
        loginStatus:true,
        user: user
      })
    }
 

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
  logout:function(){
    wx.removeStorageSync('user');
    this.setData({
      loginStatus: false
    })
  },

  gocoll:function(){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  }
})