const app = getApp()
Page({
  data: {
    good:false,
    zhong:false,
    cha:false,
    concent:'',
    focus:true,
    type:3,
    id:''
  },
  good:function(e){
    if (!this.data.zhong && !this.data.cha){
      var indexs = e.currentTarget.dataset.index;
      var index = !indexs
      this.setData({
        good: index,
        type:3
      })
    }
  },
  zhong: function (e) {
    if (!this.data.good && !this.data.cha) {
      var indexs = e.currentTarget.dataset.index;
      var index = !indexs
      this.setData({
        zhong: index,
        type: 2
      })
    }
  },
  cha: function (e) {
    if (!this.data.zhong && !this.data.good) {
      var indexs = e.currentTarget.dataset.index;
      var index = !indexs
      this.setData({
        cha: index,
        type: 1
      })
    }
  },
  // 失去焦点时获取内容
  bindTextAreaBlur: function (e) {
    this.setData({
      concent: e.detail.value,
    })
  },

  fabu:function(e){
    var that = this
    let uid = wx.getStorageSync('uid')
    if (that.data.concent == ""){
      wx.showToast({
        title:"请选择评分",
        icon:"none"
      })
    }else{
      wx.request({
        url: app.globalData.url + '/wx/index/comment.html',
        data: {
          uid: uid,
          content: that.data.concent,
          teacher_id: that.data.id,
          level: that.data.type
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        success: res => {
          console.log(res)
          if (res.data.success){
            wx.showToast({
              title: "发布成功",
              icon: "none"
            })
          }
        }
      })
    }
  },
  onLoad: function (ops) {
    this.setData({
      id:ops.id
    })
  },
  onShareAppMessage: function () {

  }
})