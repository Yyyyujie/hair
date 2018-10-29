// pages/uploadHair/uploadHair.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr:[],
    orderId:'',
    nikename:'',
    ii:0,
    imgList:[],
    uploadArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId:options.orderId,
      nikename: options.name
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
  init:function(){
    let that = this;
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.hairList, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      orderId: that.data.orderId,
    }, (ret) => {
        console.log(ret);
        ret.data.forEach(function(item,index){
          item.image = app.renderImage(item.image);
          console.log(item.image)
          that.data.imgList.push(item.image)
        })
        that.setData({
          imgArr: [...that.data.imgArr, ...that.data.imgList]
        })
    })
  },
  chooseImg:function(){
    let that = this;
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          imgArr: [...that.data.imgArr, ...res.tempFilePaths],
          uploadArr: [...that.data.uploadArr, ...res.tempFilePaths]
        })
      }
    })
  },
  uploadImg:function(){
    let that = this;
    if (this.data.uploadArr.length==0){
      wx.showToast({
        title: '请选择上传的图片',
        icon: 'none',
        duration: 2000
      })
    }else{
      let num = this.data.uploadArr.length;
      let i = this.data.ii;
      let file = this.data.uploadArr[i].toString();
        wx.showLoading({
          title: '上传中...',
          mask: true
        });
        console.log(file)
      wx.uploadFile({
        url: app.__config.basePath + app.__config.InterfaceUrl.uploadHair,
        filePath: file,
        name: 'files',
        formData: {
          token: wx.getStorageSync('userInfo').token,
          orderId: that.data.orderId
        },
        success: function (res) {
          if (JSON.parse(res.data).code==200){
            i++;
            that.setData({
              ii: i
            })
            if (i == num) {
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
              })


            } else {
              that.uploadImg();
            }

          }
        }
      })
      
      
    }
  },
  previewImage:function(){
    
  }
})