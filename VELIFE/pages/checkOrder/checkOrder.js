var app = getApp();
Page({

  /**
   * 页面的初始数据
   * status:1已完成
   *        2已取消
   *        3未响应
   */
  data: {
    date: '2016-09-01',//开始时间
    date1: '2016-09-01',//结束时间
    start:'',
    end:'',
    pageNo:1,
    pageSize:5,
    list:[],
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  initTime:function(){
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
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  init:function(){
    wx.showLoading({
      title: '加载中...',
    })
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.orderList, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      type: 'barber',
      id: wx.getStorageSync('userInfo').userInfo.id,
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize,
      startTime:that.data.date,
      endTime:that.data.date1
    }, (ret) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if (ret.code == 200) {
        that.setData({
          list: [...that.data.list, ...ret.data.list],
          loading:false,
          ajax: ret.data.list.length<that.data.pageSize?false:true
        })
      } else {
        wx.showToast({
          title: ret.data.msg,
          icon: 'none'
        })
      }
    })
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
    this.setData({
      list: [],
      loading: true,
      ajax: true,
      pageNo:1
    })
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.ajax) {
      wx.showLoading({
        title: '加载中...',
      })
      this.setData({
        loading: true,
        pageNo: this.data.pageNo + 1
      })
      this.init();
    }
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
  //上拉加载
  // lower: function () {
    
  // },
  search:function(){
    if (this.data.date <= this.data.date1){
      this.setData({
        list: [],
        pageNo: 1
      });
      this.init();
    }else{
      wx.showToast({
        title: '开始时间不能大于结束时间,请重新选择',
        icon:'none'
      })
    }
    
  },
  cancel:function(){
    this.initTime();
    this.setData({
      list: [],
      pageNo: 1
    });
    this.init();
  }
})