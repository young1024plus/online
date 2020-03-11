
var req = require('../../util/req.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var that = this;
    var userstr = wx.getStorageSync('user');
    var user = JSON.parse(userstr);

    req('/clist',{uid: user.userinfo._id},
      function(res){
        // console.log(res.data.data)
        if(res.data.status == 'success'){
          that.setData({
            list: res.data.data
          })
        }
      },
      function(err){

      }
    )



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
  goinfo:function(e){
    console.log(e);
    
    wx.navigateTo({
      url: '/pages/info/info?newsid=' + e.currentTarget.dataset.newsid,
    })
  }

})