const app = getApp()
Page({
  data: {
    con:''
  },
  onLoad: function (ops) {
   var id= ops.id
   var that = this
    wx.request({ // 获取所有信息
      url: app.globalData.url + '/wx/index/article-view.html',
      data: {
        id:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data;
        console.log(ret)
        that.setData({
          con: ret.data
        })
        console.log(that.data.con)
      }
    })

  },
  onShareAppMessage: function () {

  }
})