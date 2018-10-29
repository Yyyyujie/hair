const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    code:'',
    phone:'',
    pass:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideLoading();
  },
  onShow: function () {
    let that=this;
    this.getUserInfo();
    if (app.WxService.getStorageSync('userInfo').rember){
      that.setData({
        phone: app.WxService.getStorageSync('userInfo').phone,
        pass: app.WxService.getStorageSync('userInfo').password
      })
    }
  },
  getUserInfo() {
    let that=this;
    return app.WxService.login()
      .then(data => {
        that.setData({
          code:data.code
        })
      })
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
  //改变checkbox的状态
  chengeCheck:function(){
      this.setData({
        checked:!this.data.checked
      })
  },
  // 用户点击登录
  login:function(e){
    let checkedStatus = this.data.checked;
    var rxPhone = /^1[3|5|8|7]\d{9}$/; 
    let phone = e.detail.value.phone;
    let password = e.detail.value.password;
    let code=this.data.code;
    let userPh='';
    //手机号码和密码格式正确  发起登录请求
    if (rxPhone.test(phone)){
      // if(this.data.checked){
      //   userPh={
      //     phone: phone,
      //     password: password,
      //     code:code,
      //     rember:true
      //   }
      // }else{
      //   userPh = {
      //     phone: phone,
      //     password: password,
      //     code: code
      //   }
      // }
      
      wx.showLoading({
        title:'正在登陆中...',
        mask:true,
        success:function(){
          app.wxItools.wxItools.request(app.__config.InterfaceUrl.loginurl, 'POST', {
            loginName: phone,
            password: password,
            code: code
          }, (data) => {
            if (data.code == 200) {
              data.data.userInfo.headImage = app.renderImage(data.data.userInfo.headImage);
              let str = Object.assign(data.data, userPh);
              app.WxService.setStorageSync('userInfo', str);
              wx.setStorageSync('loginInfo', {
                'loginName': phone,
                'password': password
              })
              app.WxService.switchTab('../index/index')
            }else{
              wx.showToast({
                title: '登录失败',
                icon: 'none',
              })
            }
          })
         
        }
      })
    }else{
      wx.showToast({
        title: '用户名或密码有误',
        icon: 'none',
        mask:true,
        duration: 2000
      })
    }
    
  }
})