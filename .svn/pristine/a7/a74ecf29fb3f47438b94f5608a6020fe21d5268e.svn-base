const app = getApp()
Page({
  data: {
    tab: 0,
    list:[],
  },
  //tab切换
  navTab: function (e) {
    var that = this;
    let uid = wx.getStorageSync('uid')
    that.setData({
      tab: e.currentTarget.dataset.id
    }) 
    if (e.currentTarget.dataset.id == 1){ // 未付款列表
      wx.request({
        url: app.globalData.url + '/wx/index/order-list.html',
        data: {
          uid: uid,
          type:1
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: res => {
          var ret = res.data.data
          that.setData({
            list: ret
          })
        }
      })
    } else if (e.currentTarget.dataset.id == 2){
      wx.request({
        url: app.globalData.url + '/wx/index/order-list.html',
        data: {
          uid: uid,
          type: 2
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: res => {
          var ret = res.data.data
          that.setData({
            list: ret
          })
        }
      })
    } else if (e.currentTarget.dataset.id == 0) {
      wx.request({
        url: app.globalData.url + '/wx/index/order-list.html',
        data: {
          uid: uid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: res => {
          var ret = res.data.data
          that.setData({
            list: ret
          })
        }
      })
    }
  },
  onLoad: function (ops) {
    let uid = wx.getStorageSync('uid')
    var that = this
    wx.request({
      url: app.globalData.url + '/wx/index/order-list.html',
      data: {
        uid: uid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: res => {
        var ret = res.data.data
        that.setData({
          list:ret
        })
      }
    })
  },
  // 取消
  quxiao:function(e){
    var that = this
    var order= e.currentTarget.dataset.id
    let uid = wx.getStorageSync('uid')
    wx.request({
      url: app.globalData.url + '/wx/index/cancel-order.html',
      data: {
        uid: uid,
        order_sn: order
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: res => {
        var ret = res.data
        if (ret.success){
          wx.showToast({
            title:"取消成功",
            icon:"none"
          })
        }
      }
    })
  },
  // 支付
  pay:function(e){
    var that = this
    var order = e.currentTarget.dataset.id
    let uid = wx.getStorageSync('uid');
    wx.request({
      url: app.globalData.url + '/wx/index/again-pay.html',
      data: {
        uid: uid,
        order_sn: order
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: res => {
        var ret = res.data.data
        wx.requestPayment({
          timeStamp: ret.timeStamp,
          nonceStr: ret.nonceStr,
          package: ret.package,
          signType: 'MD5',
          paySign: ret.paySign,
          success(res) {
            wx.showToast({
              title: '支付成功',
            })
          },
          fail(res) {
            wx.showToast({
              icon: "loading",
              title: '支付失败',
            })
            that.onShow();
          }
        })
      }
    })
  },
  onShareAppMessage: function () {

  }
})