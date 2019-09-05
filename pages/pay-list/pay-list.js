var app = getApp()
Page({
  data: {
    ner:0,
    price:100,
    hour:1,
    school_id:'',
    subject_id:'',
    kemu:'',
    num: 1, //学时数
    danjia:'',
    first:true, // 判断是否第一次购买学时
    checked: false,
    checkedxieyi:false,
    jiazhao:'',
    statement:false,
    dis:5,
    diabled:true,
    school_name:'',
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
  // 科二选择学时
  remove2:function(){
    var that = this;
    if (that.data.first){
      wx.showToast({
        title: "您当前不能选择课时",
        icon: "none"
      })
    }else{
      if (that.data.num == 1) {
        wx.showToast({
          title: "一次购买不能小于1课时",
          icon: "none"
        })
      } else {
        var n = that.data.num;
        n = n - 1;
        that.setData({
          num: n,
          price: n * that.data.danjia
        })
      }
    }
  },
  add2:function(){
    var that = this;
    if (that.data.first) {
      wx.showToast({
        title: "您当前不能选择课时",
        icon: "none"
      })
    } else {
        var n = that.data.num;
        n = n + 1;
        that.setData({
          num: n,
          price: n * that.data.danjia
        })
    }
  },
  // 弹出免责声明
  statement:function(){
    var that = this;
    that.setData({
      statement:true,
    })
    var n = that.data.dis;
    var time = setInterval(function(){
      n--;
      if(n==0){
        that.setData({
          diabled: false,
        })
        clearInterval(time);
      }else{
        that.setData({
          dis:n,
        })
      }
    },1000)
  },
  // 隐藏免责声明
  qxstatement:function(){
    var that = this;
    that.setData({
      statement: false
    })
  },
  onLoad: function (ops) {
    var that = this;
    let uid = wx.getStorageSync('uid')
    that.setData({
      school_id:ops.id,
      subject_id:ops.lid,
      jiazhao:ops.jz
    })
    wx.request({ //获取之前有没有购买过学时
      url: app.globalData.url + '/wx/index/query-order.html',
      method: 'POST',
      data: {
        uid: uid,
        subject_id: ops.lid,
        school_id: ops.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        var ret = res.data;
        //单个学时的价钱
        var dan = ret.list[0].price / ret.list[0].hours; 
        if(ret.data){ //没有购买过学时的
          that.setData({
            first: true,
            num: ret.list[0].hours,
          })
        }else{ // 购买过学时的
          that.setData({
            first: false,
            num:1
          })
        }
        that.setData({
          kemu: ret.list[0],
          danjia: dan,
          price: that.data.num * dan,
          school_name: ret.school.school_name
        })
      }
    })
  },
  // 支付
  pay:function(){
    var that = this;
    let uid = wx.getStorageSync('uid')
    if (this.data.checked){
      wx.request({
        url: app.globalData.url + '/wx/index/keshi-pay.html',
        method: 'POST',
        data: {
          uid: uid,
          school_id:that.data.school_id,
          subject_id: that.data.subject_id,
          price: that.data.price,
          class_hour: that.data.hour,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success:res=>{
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
                      url: '/pages/details/details?id=' + that.data.school_id + '&jz=' + that.data.jiazhao,
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
        content: "您未同意相关协议，暂时不能支付",
        showCancel: false,//是否显示取消按钮
        confirmText: "确定",//默认是“确定”
        confirmColor: '#000',//确定文字的颜色
      })
    }
  },
  onShareAppMessage: function () {

  }
})