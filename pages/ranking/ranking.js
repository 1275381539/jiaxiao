const app = getApp()
Page({
  data: {
    tab:1,
    school:[],
    imgUrl:[
      "../../image/r1.png",
      "../../image/r2.png",
      "../../image/r3.png"
    ]
  },
  //tab切换
  navTab: function (e) {
    var that = this;
    let uid = wx.getStorageSync('uid')
    let latitude = wx.getStorageSync('latitude')
    let longitude = wx.getStorageSync('longitude')
    that.setData({
      tab: e.currentTarget.dataset.id
    })
    wx.request({ // 获取所有信息
      url: app.globalData.url + '/wx/index/list.html',
      data: {
        uid: uid,
        type: that.data.tab,
        lat: latitude,
        lng: longitude
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data.data;
        that.setData({
          school: ret.school
        })
      }
    })
  },
  onLoad: function (options) {
    let uid = wx.getStorageSync('uid')
    let latitude = wx.getStorageSync('latitude')
    let longitude = wx.getStorageSync('longitude')
    var that = this;
    wx.request({ // 获取所有信息
      url: app.globalData.url + '/wx/index/list.html',
      data: {
        uid: uid,
        type: that.data.tab,
        lat:latitude,
        lng: longitude
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data.data;
        that.setData({
          school: ret.school
        })
      }
    })
  },
  onShareAppMessage: function () {

  }
})