const app = getApp()
Page({
  data: {
    school:'',  // 驾校信息
    list:[], // 科目详情
    teacher:[], //教练列表
    jxid:'',
    tab:0,
    img:[],
    kemu:true,
    flag:2,
    difference:[],
    comment:[],
    plList:[],
    ins:[],
    dl:'',
    gl:'',
    zl:'',
    jdf:'',
    pl:1,
    pages:true, // 判断该跳哪个页面
    jzt:'',
    jzid:'', // 驾照类型
  },
  //科目tab切换
  navTab: function (e) {
    var that = this;
    if (e.currentTarget.dataset.id == 0){
      that.setData({
        kemu: true
      })
    }else{
      that.setData({
        kemu: false
      })
    }
    that.setData({
      tab: e.currentTarget.dataset.id
    })
  },
  // 评论切换
  pl:function(e){
    var that = this
    var pls = e.currentTarget.dataset.id;
    that.setData({
      pl: pls
    });
    if (pls == 1){
      that.setData({
        plList: that.data.comment.good
      });
    } else if (pls == 2){
      that.setData({
        plList: that.data.comment.ins
      });
    } else if(pls == 3){
      that.setData({
        plList: that.data.comment.difference
      });
    }
  },
  // 拨打电话
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.school.school_phone,
    })
  },
  // 打开地图
  map:function(e){
    var lat = parseFloat(e.currentTarget.dataset.lat) 
    var lng = parseFloat(e.currentTarget.dataset.lng)
    wx.openLocation({
      latitude: lng,
      longitude: lat,
      scale: 16
    })
  },
  // 获取二维码
  qrcode:function(){
    var that = this
    wx.request({
      url: app.globalData.url + '/wx/index/wxcode.html',
      data: {
        id: this.data.jxid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        if(res.data.success){
          var img = 'https://jxiao.chaojibuyers.com/' + res.data.data;
          wx.navigateTo({
            url: '/pages/qrcode/qrcode?img=' + img,
          })
        }
      }
    })
  },
  onLoad: function (ops) {
    var that = this;
    let uid = wx.getStorageSync('uid');
    let lat = wx.getStorageSync('latitude')
    let lng = wx.getStorageSync('longitude')
    let jiazhao = ops.jz; // 当前选择的驾照类型
    that.setData({
      jxid:ops.id,
      jzid: jiazhao
    })
    // 获取驾校信息
    wx.request({
      url: app.globalData.url +'/wx/index/view.html',
      data:{
        uid:uid,
        id:ops.id,
        lat: lat,
        lng: lng,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success:function(res){
        var ret = res.data.data
        that.setData({
          school: ret.School,
          img:ret.img,
          teacher: ret.teacher,
          difference: ret.comment.difference,
          comment: ret.comment,
          ins: ret.comment.ins,
          dl: ret.comment.difference.length,
          gl: ret.comment.good.length,
          zl: ret.comment.ins.length,
          jdf: ret.jdf,
          plList: ret.comment.good,
          jzt: jiazhao
        })
        var arr = [];
        for(var i = 0;i<ret.list.length;i++){ //根据不同的驾照类型显示对应的驾照
          if (ret.list[i].subjecttype.subject_type == 'C1' && jiazhao == 'C1'){
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'C2' && jiazhao == 'C2'){
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'A1' && jiazhao == 'A1'){
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'A3' && jiazhao == 'A3') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'B1' && jiazhao == 'B1') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'B2' && jiazhao == 'B2') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'D' && jiazhao == 'D') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'E' && jiazhao == 'E') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'F' && jiazhao == 'F') {
            arr.push(ret.list[i])
          } 
        }
        if (jiazhao == 'C1' || jiazhao == 'C2'){
          that.setData({
            flag: ret.user.record_flg, // 建档费状态
            pages:true,
          })
        }else{
          that.setData({
            pages: false,
          })
        }
        that.setData({
          list:arr
        })
      }
    })
  },
  pay:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var lid = e.currentTarget.dataset.lid;
    var type = e.currentTarget.dataset.type;
    var jiazhao = that.data.jzid
    var pages = that.data.pages;
    if (that.data.flag != 0){
      if (pages) {
        wx.navigateTo({
          url: '../pay-list/pay-list?id=' + id + '&lid=' + lid + '&type=' + type + '&jz=' + jiazhao + '&text=' + that.data.school.school_name,
        })
      } else {
        wx.navigateTo({
          url: '../process-pay/process-pay?id=' + id + '&lid=' + lid + '&type=' + type + '&jz=' + jiazhao + '&text=' + that.data.school.school_name,
        })
      }
    }else{
      wx.showToast({
        icon:'none',
        title: '请先缴纳建档费',
      })
    }
    
  },
  onShow: function (){
    var that = this;
    let uid = wx.getStorageSync('uid');
    let lat = wx.getStorageSync('latitude')
    let lng = wx.getStorageSync('longitude')
    let jiazhao = that.data.jzid; // 当前选择的驾照类型
    // 获取驾校信息
    wx.request({
      url: app.globalData.url + '/wx/index/view.html',
      data: {
        uid: uid,
        id: that.data.jxid,
        lat: lat,
        lng: lng,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        var ret = res.data.data
        that.setData({
          school: ret.School,
          img: ret.img,
          teacher: ret.teacher,
          difference: ret.comment.difference,
          comment: ret.comment,
          ins: ret.comment.ins,
          dl: ret.comment.difference.length,
          gl: ret.comment.good.length,
          zl: ret.comment.ins.length,
          jdf: ret.jdf,
          plList: ret.comment.good,
          jzt: jiazhao
        })
        var arr = [];
        for (var i = 0; i < ret.list.length; i++) { //根据不同的驾照类型显示对应的驾照
          if (ret.list[i].subjecttype.subject_type == 'C1' && jiazhao == 'C1') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'C2' && jiazhao == 'C2') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'A1' && jiazhao == 'A1') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'A3' && jiazhao == 'A3') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'B1' && jiazhao == 'B1') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'B2' && jiazhao == 'B2') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'D' && jiazhao == 'D') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'E' && jiazhao == 'E') {
            arr.push(ret.list[i])
          } else if (ret.list[i].subjecttype.subject_type == 'F' && jiazhao == 'F') {
            arr.push(ret.list[i])
          }
        }
        if (jiazhao == 'C1' || jiazhao == 'C2') {
          that.setData({
            flag: ret.user.record_flg,
            pages: true,
          })
        } else {
          that.setData({
            pages: false,
          })
        }
        that.setData({
          list: arr
        })
      }
    })
  },
  onShareAppMessage: function () {

  }
})