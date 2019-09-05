var app = getApp();
Page({
  data: {
    keshi: '', 
    f:0,
  },
  none:function(e){
    var index = e.currentTarget.dataset.index;
    var that = this
    that.data.keshi[index].flg = !that.data.keshi[index].flg
    that.setData({
      keshi:that.data.keshi
    })
  },
  onLoad: function (ops) {
    var that = this;
    wx.request({
      url: app.globalData.url + '/wx/index/hour.html',
      data: {
        uid: ops.uid,
        id:ops.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: res => {
        var ret = res.data;
        that.setData({
          keshi: ret.data
        })
      }
    })
  }
})