const app = getApp()
Page({
  data: {
    teacher:'',
  },
callGetPhone(e) {
  let telPhone = e.currentTarget.dataset.phone;
  wx.makePhoneCall({
    phoneNumber: telPhone
  })
 },
  onLoad: function (ops) {
    var that = this;
    let uid = wx.getStorageSync('uid');
    wx.request({
      url: app.globalData.url + '/wx/index/teacher-view.html',
      data: {
        uid: uid,
        id: ops.id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data
        that.setData({
          teacher: ret.data,
        })

      }
    })
  },
  img: function (e) {
    var src = e.currentTarget.dataset
    var arr = []
    for (let i in src) {
      arr.push(src[i]); //属性
    }
    wx.previewImage({
      urls:arr,
    })
  },
  onShareAppMessage: function () {

  }
})