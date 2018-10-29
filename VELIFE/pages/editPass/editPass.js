var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      oldPass:'',
      newPass:'',
      againPass:''
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
  oldPass:function(e){
    this.setData({
      oldPass: e.detail.value
    })
  },
  newPass: function (e) {
    this.setData({
      newPass: e.detail.value
    })
  },
  againPass: function (e) {
    this.setData({
      againPass: e.detail.value
    })
  },
  edit:function(){
      wx.showLoading({
        title: '请求中...',
      })
      let newPass=this.data.newPass;
      let oldPass = this.data.oldPass;
      let againPass = this.data.againPass;
      if(oldPass.length>=6){
        if (newPass.length>=6){
            if(newPass==againPass){
              app.wxItools.wxItools.request(app.__config.InterfaceUrl.editPass, 'POST', {
                token: wx.getStorageSync('userInfo').token,
                oldPwd:oldPass,
                newPwd:newPass,
                aginNewPwd:againPass
              }, (ret) => {
                  wx.hideLoading();
                  if(ret.code==200){
                    wx.showToast({
                      title: '修改成功',
                      icon:''
                    })
                    wx.clearStorage();
                    setTimeout(function(){
                      wx.reLaunch({
                        url: '../../pages/login/login'
                      })
                    },500)
                    
                  }
              })
            }else{
              wx.showToast({
                title: '两次密码不一致',
                icon: 'none'
              })
            }
          }else{
              wx.showToast({
                title: '请输入正确的新密码',
                icon: 'none'
              })
          }
      }else{
        wx.showToast({
          title: '请输入正确的原始密码',
          icon:'none'
        })
      }
  }
})