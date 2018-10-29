//获取应用实例
const app = getApp();
// pages/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    onlineStatus:0
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
    wx.showLoading({
      title: '加载中...',
    })
    let that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        wx.hideLoading();
         res.data.userInfo.headImage = app.renderImage(res.data.userInfo.headImage);
        that.setData({
          user: res.data.userInfo
        })
      },
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
  // 点击头像进入个人信息
  person:function(){
    wx.navigateTo({
      url: '../person/person',
    })
  },
  //点击查看订单
  check:function(){
    wx.navigateTo({
      url: '../checkOrder/checkOrder',
    });
  },
  //点击查看工作经验
  work:function(){
    wx.navigateTo({
      url: '../work/work',
    })
  },
  //点击我的作品
  history:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  //对我的评价
  eva:function(){
    wx.navigateTo({
      url: '../eva/eva',
    })
  },
  //签到打卡
  Sign:function(){
    wx.navigateTo({
      url: '../sign/sign',
    })
  },
  //业绩统计
  report:function(){
    wx.navigateTo({
      url: '../report/report',
    })
  },
  //结账统计+查询
  bill:function(){
    wx.navigateTo({
      url: '../bill/bill',
    })
  },
  //结账
  account:function(){
    wx.navigateTo({
      url: '../Account/Account',
    })
  }
})