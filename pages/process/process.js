var app = getApp()
Page({
  data: {
    jiazhao:'',
    img1:"http://img.chaojibuyers.com:9011/jiaxiao/tianjia1.png",
    img2:"http://img.chaojibuyers.com:9011/jiaxiao/tianjia2.png",
    img3:"http://img.chaojibuyers.com:9011/jiaxiao/tianjia3.png",
    id:'', // 驾校id
    photo:false,
    photo3: false,
    news: [], // 身份证正面提取的信息
    a: false, // 上传了正面
    b: false, //  上传了背面
    news1: [], // 身份证背面提取的信息
    checked: false,
    checkedxieyi: false,
  },
  //是否
  checkedTap: function () {
    var checked = this.data.checked;
    this.setData({
      "checked": !checked

    })
  },
  checkedxieyi: function () {
    var checkedxieyi = this.data.checkedxieyi;
    this.setData({
      "checkedxieyi": !checkedxieyi

    })
  },
  //上传图片
  chooseImage: function (e) {
    var that = this;
    let uid = wx.getStorageSync('uid')
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        // 上传图片
        if (e.currentTarget.dataset.id == 1){
          that.setData({
            img1:tempFilePaths[0]
          })
        } else if (e.currentTarget.dataset.id == 2){
          that.setData({
            img2:tempFilePaths[0]
          })
        }else{
          that.setData({
            img3: tempFilePaths[0],
            photo3:true
          })
        }
        wx.uploadFile({
          url: app.globalData.url + '/wx/index/wxupload.html', //接口
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            wx.showLoading({
              title: '读取信息中',
              mask:true,
            })
            let img_path = JSON.parse(res.data).img_path;
            let img = that.data.imgs_url;
            img = img_path;
            that.setData({
              imgs_url: img
            })
              //行驶证文字识别
              wx.request({
                url: app.globalData.url + '/wx/index/idcard.html',
                method: 'POST',
                data: {
                  img: 'https://jxiao.chaojibuyers.com' + img,
                  type: e.currentTarget.dataset.id,
                  uid: uid
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  if (!res.data.success) {
                    wx.showToast({
                      title: '身份证读取错误,请重新上传清晰的照片',
                      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                      duration: 2000
                    })
                    that.setData({
                      photo: false
                    })
                  } else {
                    if (res.data.data.words_result_num == 6) { // 上传的为正面
                      var arr = [];
                      for (var i in res.data.data.words_result) {
                        arr.push(res.data.data.words_result[i].words)
                      }
                      that.setData({
                        news: arr,
                        a: true
                      })
                      wx.hideLoading()

                    } else { // 上传的为背面
                      var arr1 = []
                      for (var i in res.data.data.words_result) {
                        arr1.push(res.data.data.words_result[i].words)
                      }
                      that.setData({
                        b: true,
                        news1: arr1
                      })
                      wx.hideLoading()
                    }
                    if (that.data.a == true && that.data.b == true) {
                      that.setData({
                        photo: true
                      })
                    }
                  }
                }
              })
          }
        })
      }
    })
  },
  // 支付
  bindgetuserinfo:function(e){
    var that = this
    if (this.data.checked) {
      if (that.data.photo && that.data.photo3) {
        wx.login({
          success: res => {
            let uid = wx.getStorageSync('uid');
            wx.request({
              url: app.globalData.url + '/wx/index/opdeid.html',
              method: 'POST',
              data: {
                uid: uid,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                js_code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: res => {
                if(res.data.success){
                  wx.request({
                    url: app.globalData.url + '/wx/index/pay.html',
                    method: 'POST',
                    data: {
                      school_id: that.data.id,
                      uid: uid
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      var ret = res.data.data
                      wx.requestPayment({
                        timeStamp: ret.timeStamp,
                        nonceStr: ret.nonceStr,
                        package: ret.package,
                        signType: 'MD5',
                        paySign: ret.paySign,
                        success(res) {
                          wx.showModal({
                            title: '提示',
                            content: "支付成功",
                            showCancel: false,//是否显示取消按钮
                            confirmText: "确定",//默认是“确定”
                            confirmColor: '#000',//确定文字的颜色
                            success: function (res) {
                              if (res.cancel) {
                                //点击取消,默认隐藏弹框
                              } else {
                                //点击确定
                                wx.redirectTo({
                                  url: '/pages/details/details?id=' + that.data.id + '&jz=' + that.data.jiazhao,
                                })
                              }
                            }
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
                }else{
                  wx.showModal({
                    title: '提示',
                    content: "上传信息失败，请稍后重试",
                    showCancel: false,//是否显示取消按钮
                    confirmText: "确定",//默认是“确定”
                    confirmColor: '#000',//确定文字的颜色
                    success: function (res) {

                    }
                  })
                }
              }
            })
          }
        })
      }else{
        wx.showToast({
          title: '上传图片信息错误',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
        return;
      }
    } else {
      wx.showModal({
        title: '提示',
        content: "您未同意相关协议，暂时不能支付",
        showCancel: false,//是否显示取消按钮
        confirmText: "确定",//默认是“确定”
        confirmColor: '#000',//确定文字的颜色
      })
    }
  },
  onLoad: function (ops) {
    var that = this
    let jiazhao = ops.jz
    that.setData({
      jiazhao: jiazhao,
      id: ops.id
    })
  },
  onShareAppMessage: function () {

  }
})