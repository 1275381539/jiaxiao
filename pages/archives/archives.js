const app = getApp()
Page({
  data: {
    index:1
  },
  onSlideChangeEnd: function (e) {
    var that = this;
    that.setData({
      index: e.detail.current + 1
    })
  },
  onLoad: function (options) {

  },
  onShareAppMessage: function () {

  }
})