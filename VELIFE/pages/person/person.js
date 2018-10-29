//获取应用实例
var util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:'',
      workStatus:1,
      time: '',
      date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = util.formatTime(new Date());
    time = time.substring(0, time.indexOf(" "));
    time.replace(/\//g, "-")
    this.setData({
      date: time.replace(/\//g, "-")
    })
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
    let that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        res.data.userInfo.headImage = app.renderImage(res.data.userInfo.headImage);
        that.setData({
          user: res.data.userInfo,
          workStatus: res.data.userInfo.workStatus,
          time: res.data.userInfo.reworkTime ? res.data.userInfo.reworkTime :'00:00'
        });
        
      }
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
  edit:function(){
    wx.navigateTo({
      url: '../editPass/editPass',
    })
  },
  //更改理发师状态
  changeStatus: function () {
    let that = this;
    wx.showActionSheet({
      itemList: ['工作中', '离开', '吃饭中', '休息'],
      success: function (res) {
        console.log(res.tapIndex);
        app.wxItools.wxItools.request(app.__config.InterfaceUrl.updateWorkStatus, 'POST', {
          token: wx.getStorageSync('userInfo').token,
          workStatus: res.tapIndex == 0 ? 1 : res.tapIndex + 2
        }, (ret) => {
          if (ret.code == 200) {
            if (res.tapIndex != 0){
              wx.showToast({
                title: '请选择复工时间',
                icon: 'none'
              })
            }else{
              var developer = (wx.getStorageSync('userInfo'));
              developer.userInfo.reworkTime = '00:00';
              wx.setStorageSync('userInfo', developer);
            }
            that.setData({
              time:'00:00',
              workStatus: res.tapIndex == 0 ? 1 : res.tapIndex + 2
            });
            var developer = (wx.getStorageSync('userInfo'));
            developer.userInfo.workStatus = (res.tapIndex == 0 ? 1 : res.tapIndex+2);
            wx.setStorageSync('userInfo', developer);
          }
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  bindTimeChange: function (e) {
    let that=this;
    console.log(e.detail.value)
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.reworkTime, 'POST', {
      token: wx.getStorageSync('userInfo').token,
      reworkTime: that.data.date + " " + e.detail.value + ":00"
    }, (ret) => {
      console.log(ret)
      console.log(that.data.date + " " + e.detail.value+":00")
        if(ret.code==200){
          that.setData({
            time:that.data.date+" "+e.detail.value
          });
          var developer = (wx.getStorageSync('userInfo'));
          developer.userInfo.reworkTime = that.data.date + " " + e.detail.value;
          wx.setStorageSync('userInfo', developer);
        }
    })
   
  },
})