var app = getApp();
let interval;
Page({

  /**
   * 页面的初始数据
   */
  /**
   * 状态：0：待服务
   *       1：正在服务
   *        2：已完成
   *        -1：跳过
   *       -2：未呼叫
   */
  data: {
      user:{
        number:'A001',
        name:'张三',
        service:'洗头',
        phone:'13678888888',
        time:'2018-09-10',
        wait:9,
        status:-2
      },
      list:[],
      nothing:true,
      shoutStatus:true,
      shoutSecond:30
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
    });
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  init:function(){
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.getShowOrder, 'GET', {
      token: wx.getStorageSync('userInfo').token
    }, (ret) => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if(ret.data!=null){
        that.setData({
          list: ret.data,
          nothing:false
        })
      }else{
        that.setData({
          list: ret.data,
          nothing: true
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
  //联系客户
  call:function(){
    let  that=this;
    wx.showModal({
      title: '提示',
      content: '是否确认联系客户',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: that.data.list.member.mobile 
          })
        }
      }
    })
  },
  //呼叫用户
  formSubmit:function(e){
    //呼叫  推送到公众号
    let that=this;
    wx.showLoading({
      title: '叫号中...',
      mask: true
    })
    
    
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.shout, 'GET', {
      token: wx.getStorageSync('userInfo').token,
       type:'current',
      orderId:that.data.list.id,
      // formId: e.detail.formId
    }, (ret) => {
      wx.hideLoading();
      if(ret.code==200){
        let status = 'list.callStatus';
        this.setData({
          [status]: 1,
          shoutStatus:false
        });
        that.second();
      }
    })
  },
  //点击服务中
  serviceing:function(){
    wx.showLoading({
      title: '请稍等...',
      mask:true
    })
    let that=this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.startService, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      orderId: that.data.list.id
    }, (ret) => {
      wx.hideLoading();
      if(ret.code==200){
        let status = 'list.orderStatus';
        this.setData({
          [status]: "0001",
          shoutSecond:30
        });
        clearInterval(interval)
      }else{
        wx.showToast({
          title: ret.msg,
          icon:'none'
        });
        this.init();
      }
    })
    
  },
  //点击已完成 
  done:function(){
      //这里完成后刷新数据  取新的第一条数据
      let that=this;
      wx.showLoading({
        title: '请稍等...',
        mask: true
      })
      app.wxItools.wxItools.request(app.__config.InterfaceUrl.endService, 'GET', {
        token: wx.getStorageSync('userInfo').token,
        orderId: that.data.list.id
      }, (ret) => {
        wx.hideLoading();
        if(ret.code==200){
          that.init();
        }
      })
  },
  next: function (e) {
    let that=this;
    wx.showModal({
      title: '提示',
      content: '是否确认跳过该顾客',
      success: function (res) {
        if (res.confirm) {
          //这里确认跳过该顾客
          wx.showLoading({
            title: '加载中...',
          })
          app.wxItools.wxItools.request(app.__config.InterfaceUrl.getNextMember, 'GET', {
            token: wx.getStorageSync('userInfo').token,
             type: 'next',
            orderId: that.data.list.id,
            // formId: e.detail.formId   
          }, (ret) => {
            wx.hideLoading();
            if (ret.code == 200 && ret.data!=null){
             that.setData({
               list:'',
               list: ret.data,
               shoutSecond:30,
               shoutStatus:true
             });
             clearInterval(interval)
           }else{
              wx.showToast({
                title: '暂无更多订单...',
                icon:'none'
              })
           }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  second:function(){
    let that = this;
    interval=setInterval(function(){
        that.setData({
          shoutSecond: that.data.shoutSecond-1
        });
      if (that.data.shoutSecond==0){
          clearInterval(interval);
          that.setData({
            shoutStatus:true,
            shoutSecond:30
          })
      }
    },1000)
  }
})