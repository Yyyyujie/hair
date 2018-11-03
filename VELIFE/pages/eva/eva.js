var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:1,
    pageSize:10,
    list:[],
    loading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      pageNo: 1,
      list: []
    })
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
  init:function(){
    let that = this;
    let barber = 'barber.id';
    let member = 'member.id';
    let shop = 'shopVelife.id';
    let barberId;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        barberId = res.data.userInfo.id
      },
    })
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.evaList, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      pageNo: that.data.pageNo,
      pageSize: that.data.pageSize
    }, (ret) => {
      console.log(ret)
      wx.hideLoading();
      wx.stopPullDownRefresh();
      ret.data.list.forEach(function(item,index){
        if (item.pics){
          item.pics.forEach(function (i, v) {
            item.pics[v] = app.renderImage(item.pics[v])
          })
        }
          
      })
      that.setData({
         list: [...that.data.list, ...ret.data.list],
         loading:false,
         ajax: ret.data.list.length<that.data.pageSize?false:true
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
    this.setData({
      list: [],
      loading: true,
      ajax: true,
      pageNo: 1
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
  //上拉加载
  lower:function(){
    this.data.loading = true;
    this.data.pageNo++;
    this.init();
  },
  previewImage:function(e){
    var current = e.target.dataset.src;
    var index = e.target.dataset.index;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.list[index].pics // 需要预览的图片http链接列表  
    })
  }

})