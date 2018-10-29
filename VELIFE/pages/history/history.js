var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      history:[{
        imgArr: ["http://img.52z.com/upload/news/image/20180417/20180417015259_34589.jpg","http://img.52z.com/upload/news/image/20180417/20180417015258_99534.jpg"],
        hair1:'软',
        hair2:'少',
        face:'三角形'
      },
        {
          imgArr: ["../../images/history.png", "../../images/logo.png"],
          hair1: '软',
          hair2: '少',
          face: '三角形'
        },
        {
          imgArr: ["../../images/history.png", "../../images/logo.png"],
          hair1: '软',
          hair2: '少',
          face: '三角形'
        }],
        list:[],
        pageNo:1,
        pageSize:10,
        height:'',
        loading:false,
        scrollHeight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      scrollHeight: wx.getSystemInfoSync().windowHeight - (100 / 2),
      list: []
    });
    let that = this;
    // app.HttpService.getRequest(app.__config.InterfaceUrl.carlist,{
    //   data:{
    //     token: wx.getStorageSync('userInfo.token').token
    //   }
    // }).then(data => {
    //   console.log(JSON.stringify(data))
    // })
    that.init();
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
    // wx.showLoading({
    //   title: '加载中...',
    // });
    // this.setData({
    //   scrollHeight: wx.getSystemInfoSync().windowHeight - (100 / 2),
    //   list: [],
    //   pageNo:1
    // });
    // this.init();
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
      list:[],
      pageNo:1,
      ajax:true
    });
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
  init:function(){
    let that=this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.carlist, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      pageNo:that.data.pageNo,
      pageSize:that.data.pageSize
    }, (ret) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      that.data.loading=false;
      that.setData({
        list: [...that.data.list, ...ret.data.list],
        ajax: ret.data.list.length<that.data.pageSize?false:true,
        loading:false
      })
    })
  },
  //点击添加作品
  add:function(){
    wx.navigateTo({
      url: '../addMyWork/addMyWork',
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    // current.forEach(function(item,index){
    //   current[index] = app.__config.basePath+item
    // })
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: current // 需要预览的图片http链接列表  
    })
  },
  edit:function(e){
    let that=this;
    wx.showModal({
      title: '提示',
      content: '是否确定删除该作品',
      success:function(res){
        if (res.confirm) {
          let id = e.currentTarget.dataset.id;
          let index = e.currentTarget.dataset.index;
          app.wxItools.wxItools.request(app.__config.InterfaceUrl.delWork, 'GET', {
            token: wx.getStorageSync('userInfo').token,
            id:id
          }, (ret) => {
            if(ret.code==200){
              wx.showLoading({
                title: '正在删除...',
              })
             that.data.list=[];
             that.init();
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  //上拉加载
  lower:function(){
    this.setData({
      lading:true,
      pageNo:this.data.pageNo+1
    })
    this.init();
  },

})