const app = getApp()
Page({
  data: {
    con:''
  },
  onLoad: function (ops) {
    var that = this;
    let uid = wx.getStorageSync('uid');
    // 获取驾校信息
    wx.request({
      url: app.globalData.url + '/wx/index/content.html',
      data: {
        uid: uid,
        id: ops.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data.data.school_describe
        var html = that.escape2Html(res.data.data.school_describe);
        that.setData({
          con: html
        })
      }
    })
  },
escape2Html: function escape2Html(str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    str = str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
    str = this.formatImg(str);
    return str.replace(/\<img/ig, '< img style="max-width:100%;height:auto;"');
  },
formatImg:  function formatImg(html) {
    var newContent = html.replace(/<img[^>]*>/gi, function (match, capture) {
      var match = match.replace(/style=\"(.*)\"/gi, '');
      return match;
    });
    return newContent;
  },
  onShareAppMessage: function () {

  }
})