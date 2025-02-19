const app = getApp()
Page({
  data: {
    list:'',
    school_id:'', // 驾校id
    flag:'',
    checked: false,
    checkedxieyi:false,
    jiazhao:'',
    statement: false,
    subject_id:'',
    price:'',
    class_hour:'',
    dis: 5,
    diabled: true,
  },
  // 弹出免责声明
  statement: function (e) {
    var that = this;
    that.setData({
      statement: true,
      subject_id: e.currentTarget.dataset.id,
      price: e.currentTarget.dataset.price,
      class_hour: e.currentTarget.dataset.hour,
    })
    var n = that.data.dis;
    var time = setInterval(function () {
      n--;
      if (n == 0) {
        that.setData({
          diabled: false,
        })
        clearInterval(time);
      } else {
        that.setData({
          dis: n,
        })
      }
    }, 1000)
  },
  // 隐藏免责声明
  qxstatement: function () {
    var that = this;
    that.setData({
      statement: false
    })
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
  onLoad: function (ops) {
    var id = ops.id
    let uid = wx.getStorageSync('uid')
    var that = this
    that.setData({
      school_id:ops.id,
      flag:ops.flag,
      jiazhao:ops.jz
    })
    wx.request({ // 获取所有信息
      url: app.globalData.url + '/wx/index/character.html',
      data: {
        id:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data.data;
        that.setData({
          list:ret
        })
      }
    })
  },
  // 支付
  pay:function(e){
    var that = this;
    if (that.data.flag == 0){
      wx.showToast({
        icon: 'none',
        title: '请先缴纳建档费',
      })
    }else{
      if (this.data.checked) {
        let uid = wx.getStorageSync('uid')
        wx.request({
          url: app.globalData.url + '/wx/index/keshi-pay.html',
          method: 'POST',
          data: {
            uid: uid,
            school_id: that.data.school_id,
            subject_id: that.data.subject_id,
            price: that.data.price ,
            class_hour: that.data.class_hour,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: res => {
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
                        url: '/pages/details/details?id=' + that.data.school_id+'&jz='+that.data.jz,
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
      } else {
        wx.showModal({
          title: '提示',
          content: "您未同意相关协议，暂时不能支付",
          showCancel: false,//是否显示取消按钮
          confirmText: "确定",//默认是“确定”
          confirmColor: '#000',//确定文字的颜色
        })
      }
    }
  },
  onShareAppMessage: function () {

  }
})