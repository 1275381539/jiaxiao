const app = getApp()
Page({
  data: {
    imgurl:{}
  },
  img:function(e){
    var arr= [];
    for (var i = 0; i < e.currentTarget.dataset.list.length;i++){
      if (e.currentTarget.dataset.list[i] != ''){
        arr.push('http://admin.jxiao.chaojibuyers.com' + e.currentTarget.dataset.list[i])
      }
    }
    wx.previewImage({
      urls: arr // 需要预览的图片http链接列表
    })
  },
  onLoad: function (ops) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/wx/index/album.html',
      data: {
        id: ops.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data
        that.setData({
          imgurl: ret.data
        })
      }
    })
  },
  onShareAppMessage: function () {

  }
})