var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['少', '普通', '多'],
    array1: ['软', '普通', '硬'],
    array2: ['圆形', '椭圆', '四角','逆三角','菱形','正三角'],
    array3: ['01', '02', '03'],
    index:0,
    index1:0,
    index2:0,
    index3:0,
    img:'../../images/history.png',
    imgArr:[],
    ii:0,
    imgPic:""
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    this.setData({
      index3: e.detail.value
    })
  },
  choose:function(){
    let that=this;
      wx.chooseImage({
        count: 1,
        success: function(res) {
          that.setData({
            imgArr: [...that.data.imgArr, ...res.tempFilePaths]
          })
        },
      })
  },
  //发布作品
  Release:function(){
    let that = this;
    let num = this.data.imgArr.length;
    if (num == 0) {
      wx.showToast({
        title: '请选择上传的图片',
        icon:'none'
      })
    } else { 
      wx.showLoading({
        title: '发布中...',
      })
      
      let id;

      let str = 'barber.id';
      that.upload();
    }
    



  },
  upload: function () {
    let that = this;
    let num = that.data.imgArr.length;
    let i=that.data.ii;
    let file = that.data.imgArr[i].toString();
    app.wxItools.wxItools.uploadFile(app.__config.basePath+app.__config.InterfaceUrl.upload, file, 'files', {
      token:wx.getStorageSync('userInfo').token
    }, (ret) => {
        that.data.imgPic = that.data.imgPic+app.__config.basePath+JSON.parse(ret.data).data.imgPath;
        i++;
        that.setData({
          ii:i
        });
        if(i==num){
          let str = 'barber.id';
          app.wxItools.wxItools.request(app.__config.InterfaceUrl.addWork, 'POST', {
            token: wx.getStorageSync('userInfo').token,
            hairNumber: that.data.array[that.data.index],
            hairQuality: that.data.array1[that.data.index1],
            faceType: that.data.array2[that.data.index2],
            [str]: wx.getStorageSync('userInfo').userInfo.id,
            imgUrl: that.data.imgPic
          }, (ret) => {
            wx.hideLoading();
              if(ret.code==200){
                wx.navigateBack({
                  delta: 1
                })
              }
          })
        }else{
          that.upload();
        }
      })
  }
})