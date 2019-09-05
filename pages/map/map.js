const app = getApp()
Page({
  data: {
  },
  onLoad: function (ops) {
    var that = this;
    let lat = parseFloat(ops.lat)
    let lng = parseFloat(ops.lng)
    wx.openLocation({
      latitude: lng,
      longitude: lat,
      scale: 16
    })
  },
  onShareAppMessage: function () {

  }
})