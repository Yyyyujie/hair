var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      time:3,
      work:[
        {
          store:'微剪',
          type:'技术总监',
          starttime:'2016年06月',
          endtime:'2017年12月'
        },
        {
          store: '椰岛',
          type: '技术总监',
          starttime: '2016年06月',
          endtime: '2017年12月'
        }
      ],
      list:[],
      barber:''
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
    this.init();
  },
  init:function(){
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.experience, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      barberId: wx.getStorageSync('userInfo').userInfo.id
    }, (ret) => {
      wx.hideLoading();
      that.setData({
        list: ret.data.map.list,
        barber: ret.data.map.barber
      })
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
  //点击添加工作经验
  addWork:function(){
    wx.navigateTo({
      url: '../addWork/addWork',
    })
  },
  //删除工作经验
  delWork: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除此条工作经验',
      success: function (res) {
        if (res.confirm) {
          app.wxItools.wxItools.request(app.__config.InterfaceUrl.delExperience, 'GET', {
            token: wx.getStorageSync('userInfo').token,
            barberId: wx.getStorageSync('userInfo').userInfo.id,
            id: id
          }, (ret) => {
            wx.showLoading({
              title: '删除中...',
            })
            if(ret.code==200){
              that.setData({
                list: [],
                barber: []
              })
              that.init();
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  }
})