// miniprogram/pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    pw1:'',
    pw2:'',
    avatar: ''
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
  checkUserName:function(e){
    // console.log(e)
    this.setData({
      username: e.detail.value
    })
  },

  checkpw1:function(e){
    this.setData({
      pw1: e.detail.value
    })
  },
  checkpw2: function (e) {
    this.setData({
      pw2: e.detail.value
    })
  },

  cimg: function () {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        that.setData({
          avatar: res.tempFilePaths[0]
        })
      },
    })
  },
  
  sign:function(){
    var that = this;
    if(this.data.username){
      if(this.data.pw1 == this.data.pw2){
        if (this.data.avatar){
          

          wx.uploadFile({
            url: 'http://www.young1024.com:82/sign',
            filePath: that.data.avatar,
            name: 'avatar',
            // header: {'content-type': 'multipart/form-data'}, //默认数据类型,可以不写
            formData:{
              username: that.data.username,
              password : that.data.pw1
            },
            success:function(res){
              console.log(res)
            },
            fail:function(err){
              // console.log(err)
              wx.showModal({
                title: '注册失败',
                content: err,
              })
            }
          })
        }else{
          wx.showToast({
            title: '请选择头像',
            icon: 'none'
          })
        }
        
      }else{
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none'
        }) 
      }
    }else{
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
    }
  }

})