var app = getApp();
Page({
  data: {
    imgUrls:[],
    isHide: true,
    inviteCode: '',
    list:[]
  },
  onLoad: function (ops) {
    let _this = this;
    wx.request({
      url: app.globalData.url + '/wx/site/load.html',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {},
      success: function (res) {
        var ret = res.data.data
        _this.setData({
          list:ret
        })
      }
    })
    let uid = wx.getStorageSync('uid')
    let subject = wx.getStorageSync('subject')
    if(uid != ""){ // 没有登录过
      _this.setData({
        isHide:false
      })
      if (subject != null){
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }else{
        wx.reLaunch({
          url: '/pages/driving/driving',
        })
      }
    }
  },
  /**
   * 获取手机号登录
   */
  getPhoneNumber:function(e){
    var _this = this;
    if (e.detail.errMsg == "getPhoneNumber:fail user deny") {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法支付建档费，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            //console.log('用户点击了“返回授权”')
          }
        }
      })
      return;
    } else {
      wx.login({
        success: res => {
          wx.request({
            url: app.globalData.url + '/wx/site/login.html',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
            }, 
            data: {
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              js_code: res.code
            },
            success: function (res) {
              var data = res.data;
              wx.setStorageSync('uid', res.data.data.uid);
              wx.setStorageSync('subject', res.data.data.subject);
              if(data.success){
                if (data.data.subject != null) {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                } else {//新用户
                  wx.reLaunch({
                    url: '/pages/driving/driving',
                  })
                }
              } else {//登陆失败
                wx.showModal({
                  title: '友情提示',
                  content: '登陆失败请重试！',
                })
              }
            }
          })
        }
      })
    }
  },
  // getUserInfo: function (e) {
  //   var _this = this;
  //   if (e.detail.userInfo) {
  //     // 点击确认按钮
  //     wx.getSetting({
  //       success: function (res) {
  //         if (res.authSetting['scope.userInfo']) {
  //           wx.getUserInfo({
  //             success: function (res) {
  //               // 用户已经授权过
  //               let {
  //                 nickName,
  //                 gender,
  //                 avatarUrl
  //               } = res.userInfo;
  //               let iv = res.iv;
  //               let encryptedData = res.encryptedData;
  //               wx.login({
  //                 success: res => {
  //                   // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //                   wx.request({
  //                     url: app.globalData.url + '/wx/site/login.html',
  //                     method: 'POST',
  //                     header: {
  //                       'content-type': 'application/x-www-form-urlencoded',
  //                     },
  //                     data: {
  //                       nickName: nickName,
  //                       gender: gender,
  //                       avatarUrl: avatarUrl,
  //                       code: res.code,
  //                       iv: iv,
  //                       encryptedData: encryptedData
  //                     },
  //                     success: function (res) {
  //                       var data = res.data;
  //                       wx.setStorageSync('uid', res.data.data.uid);
  //                       wx.setStorageSync('subject', res.data.data.subject);
  //                       if (data.success){
                          // if (data.data.subject != null) {
                          //   wx.reLaunch({
                          //     url: '/pages/index/index',
                          //   })
                          // } else {//新用户
                          //   wx.reLaunch({
                          //     url: '/pages/driving/driving',
                          //   })
                          // }
                      //   }else{//登陆失败
                      //     wx.showModal({
                      //       title: '友情提示',
                      //       content: '登陆失败请重试！',
                      //     })
                      //   }
                      // }
  //                   })
  //                 }
  //               })
  //             }
  //           })
  //         } else {
  //           // 用户没有授权过
  //           _this.setData({
  //             isHide: true
  //           });
  //         }
  //       }
  //     })
  //   } else {
  //     //用户按了拒绝按钮
  //     wx.showModal({
  //       title: '警告',
  //       content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
  //       showCancel: false,
  //       confirmText: '返回授权',
  //       success: function (res) {
  //         // 用户没有授权成功，不需要改变 isHide 的值
  //         if (res.confirm) {

  //         }
  //       }
  //     });
  //   }
  // },
  onShareAppMessage: function () {
  }
})