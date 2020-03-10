






var baseUrl = 'http://www.young1024.com:82'

module.exports = function(url,data,onSuccess,onFail){
  wx.request({
    url: baseUrl + url,
    method: 'post',
    data: data,
    success: function (res) {
      onSuccess(res)
    },
    fail: function (err) {
      onFail(err)
    }
  })

}