var app = getApp();
Page({
  data: {
    schoolName:'', // 驾校名称
    name: '', // 名称
    tel: '', // 联系电话
    id:''
  },
  //获取驾校名称
  schoolName:function(e){
    this.setData({
      schoolName: e.detail.value
    })
  },
  //获取名称
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取电话
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  // 提交申请
  btn:function(){
    var that = this;
    if (that.data.tel != '' && that.phoneFun(that.data.tel)){
      wx.request({
        url: app.globalData.url + '/wx/index/temporary.html',
        data: {
          school_name: that.data.schoolName,
          contacts: that.data.name,
          phone: that.data.tel,
          uid:that.data.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: res => {
          if(res.data.success){
            wx.showModal({
              title: '信息提示',
              content: "申请成功",
              showCancel: false,//是否显示取消按钮
              confirmText: "确定",//默认是“确定”
              confirmColor: '#000',//确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  wx.navigateBack({
                    delta: 1         // 返回上一页
                  });
                }
              }
            })
          }else{
            wx.showModal({
              title: '信息提示',
              content: "申请失败,请重试",
              showCancel: false,//是否显示取消按钮
              confirmText: "确定",//默认是“确定”
              confirmColor: '#000',//确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  
                }
              }
            })
          }
        }
      })
    }
  },
  //判断是否为手机号的正则表达式
phoneFun:function (phones){
  var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if(!myreg.test(phones)) {
      return false;
    } else {
      return true;
    }
},
  onLoad: function (ops) {
    this.setData({
      id: ops.id
    })
  },
})