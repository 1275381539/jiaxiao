var app = getApp();
Page({
  data: {
    con: '', // 内容
    name: '', // 名称
    tel: '', // 联系电话
    id: '', //  用户id
    schoolId:'', // 驾校ID
    tab: 1,
    schoolList:[],
    num:0
  },
  //tab切换
  navTab: function (e) {
    var that = this;
    that.setData({
      tab: e.currentTarget.dataset.id
    })
  },
  //获取电话
  tel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  //获取驾校名称
  school: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取内容
  con: function (e) {
    this.setData({
      con: e.detail.value
    })
  },
  onLoad: function (ops) {
    this.setData({
      id: ops.id
    })
    // 获取驾校列表
    wx.request({
      url: app.globalData.url + '/wx/index/school-list.html',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: res => {
        console.log()
        var arr=[]
        for (var i in res.data.data ){
          arr.push(res.data.data[i].school_name)
        }
        var schoolId = res.data.data[this.data.num].id;
        this.setData({
          schoolList: arr,
          schoolId: schoolId
        })
      }
    })
  },
  schoolList:function(e){
    this.setData({
      num: e.detail.value
    })
    // wx.navigateBack({
    //   delta: 1  
    // });
  },
  // 提交
  btn:function(){
    var that = this;
    if (that.data.tel != '' && that.phoneFun(that.data.tel)) {
      wx.request({
        url: app.globalData.url + '/wx/index/complaint.html',
        data: {
          uid: that.data.id,
          school_id: that.data.schoolId,
          content: that.data.con,
          phone: that.data.tel,
          anonymous_flg: that.data.tab
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: res => {
          if (res.data.success) {
            wx.showModal({
              title: '信息提示',
              content: "反馈成功",
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
          }
        }
      })
    }
  },
  //判断是否为手机号的正则表达式
  phoneFun: function (phones) {
    var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(phones)) {
      return false;
    } else {
      return true;
    }
  },
  onShareAppMessage: function () {

  }
})