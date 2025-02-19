const app = getApp()
Page({
  data: {
    user:{},
    school:'',
    jzt:false,
    model:'',
  },
  onLoad: function (options) {
    let uid = wx.getStorageSync('uid')
    var that = this
    wx.request({
      url: app.globalData.url + '/wx/index/user.html',
      data: {
        uid: uid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success:res=>{
        var ret = res.data.data
        console.log(ret.user);
        that.setData({
          user:ret.user,
          school:ret.school,
          model: ret.model
        })
        if (ret.user.record_flg == 1) {
          that.setData({
            jzt: true,
          })
        }
      }
    })
  },
  onShareAppMessage: function () {

  }
})