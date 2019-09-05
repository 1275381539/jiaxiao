const app = getApp()
Page({
  data: {
    list:[]
  },
  onLoad: function (options) {
    var that = this
    wx.request({ // 获取所有信息
      url: app.globalData.url + '/wx/index/article-list.html',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data;
        console.log(ret)
        that.setData({
          list:ret.data
        })
        console.log(that.data.list)
      }
    })
  },
  onShareAppMessage: function () {

  }
})