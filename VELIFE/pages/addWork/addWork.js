var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    date1: '2016-09-01',
    end:'',
    store:'',
    post:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  },
  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  //工作门店值
  store:function(e){
    this.setData({
      store: e.detail.value
    })
  },
  //工作职位
  post: function (e) {
    this.setData({
      post: e.detail.value
    })
  },
  add:function(){
    wx.showLoading({
      title: '添加中...',
    })
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.addWorkExperience, 'POST', {
      token: wx.getStorageSync('userInfo').token,
      unit:that.data.store,
      startTime:that.data.date,
      endTime:that.data.date1,
      post:that.data.post,
      barberId:wx.getStorageSync('userInfo').userInfo.id
    }, (ret) => {
      wx.hideLoading();      
      if(ret.code==200){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})