var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  jia:function(e){
    var uid = wx.getStorageSync("uid");
    var text = e.currentTarget.dataset.text;
    wx.request({
      url: app.globalData.url + '/wx/site/subject-type.html',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:{
        uid:uid,
        name: text
      },
      success:function(res){
        if(res.data.success){
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }else{
          wx.showModal({
            title: '友情提示',
            content: '选择失败请重试！',
          })
        }
      }
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})