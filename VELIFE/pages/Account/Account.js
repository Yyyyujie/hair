// pages/Account/Account.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:''
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that=this;
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.account, 'GET', {
      token: wx.getStorageSync('userInfo').token,
    }, (ret) => {
      wx.hideLoading();
      console.log(ret);
      that.setData({
        list:ret.data
      })
    })
  },

  bill:function(){

    wx.showModal({
      title: '结账提醒',
      content: '每日只能结账一次，是否确认要结账',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
            mask: true
          })
          app.wxItools.wxItools.request(app.__config.InterfaceUrl.bill, 'GET', {
            token: wx.getStorageSync('userInfo').token,
          }, (ret) => {
            wx.hideLoading();
            //200结账成功  否者跳到订单未支付
            if (ret.code == 200) {
              wx.showToast({
                title: '结账成功',
              })
            } else if (ret.code == 10001) {
              wx.showToast({
                title: ret.msg,
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: '您今日还有未结账的订单，请先处理订单后再结账',
                icon:'none'
              })
              setTimeout(function(){
                app.globalData.orderActive = 2;
                wx.switchTab({
                  url: '../order/order',
                })
              },1000)
              
            }

          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
    
  }
})