// pages/bill/bill.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',//开始时间
    date1: '2016-09-01',//结束时间
    start: '',
    end: '',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.initTime();
    this.init();
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
  initTime: function () {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    this.setData({
      end: y + '-' + m + '-' + d,
      date: y + '-' + m + '-' + d,
      date1: y + '-' + m + '-' + d
    })
  },
  init:function(){
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.settlement, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      barberId: wx.getStorageSync('userInfo').userInfo.id,
      startDate: that.data.date,
      endDate: that.data.date1
    }, (ret) => {
      console.log(ret);
      wx.hideLoading();
        for(let i=0;i<ret.data.length;i++){
          ret.data[i].createDate = that.space(ret.data[i].createDate)
        }
        that.setData({
          list:ret.data
        })
    })
  },
  //截取时间
  space:function(v){
    return v.substring(0,v.indexOf(" "));
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
  
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    //开始时间  e.detail.value
  },
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
    //结束时间： e.detail.value

  },
  search: function () {
    if (this.data.date <= this.data.date1) {
      this.setData({
        list: [],
        pageNo: 1
      });
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      this.init();
    } else {
      wx.showToast({
        title: '开始时间不能大于结束时间,请重新选择',
        icon: 'none'
      })
    }

  },
  cancel: function () {
    this.initTime();
    this.setData({
      list: [],
      pageNo: 1
    });
    this.init();
  }
})