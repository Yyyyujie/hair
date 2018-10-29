import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

var dataList;

Page({
  onShareAppMessage: res => {
    // return {
    //   title: 'ECharts 可以在微信小程序中使用啦！',
    //   path: '/pages/index/index',
    //   success: function () { },
    //   fail: function () { }
    // }
  },

  onReady: function () {
    wx.showLoading({
      title: '加载中...',
      mask:true
    });
    // 获取组件
    let that=this;
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.achievement, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      barberId: wx.getStorageSync('userInfo').userInfo.id,
      type: Number(that.data.activeIndex)+1
    }, (ret) => {
        console.log(ret);
        that.push(ret);

        that.init(0);
    })
    
  },
  push:function(ret){
    let that=this;
    let dataArr = [];
    dataArr.push({
      value: ret.data.appointmentCount,
      name: '预约人数(' + ret.data.appointmentCount+")"
    });
    dataArr.push({
      value: ret.data.cancleCount,
      name: '取消人数(' + ret.data.cancleCount+")"
    })
    dataArr.push({
      value: ret.data.appointmentCount - ret.data.cancleCount,
      name: '服务人数(' + (ret.data.appointmentCount - ret.data.cancleCount)+")"
    });
    that.setData({
      list: dataArr
    });
    dataList = dataArr;
  },
    
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    isLoaded: false,
    isDisposed: false,
    activeIndex:0,
    list:[]
  },
  toggle:function(e){
    this.dispose();
    let that=this;
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    app.wxItools.wxItools.request(app.__config.InterfaceUrl.achievement, 'GET', {
      token: wx.getStorageSync('userInfo').token,
      barberId: wx.getStorageSync('userInfo').userInfo.id,
      type: Number(e.currentTarget.dataset.num) + 1
    }, (ret) => {
      that.push(ret);
      console.log(ret)
      that.init(e.currentTarget.dataset.num)
    })
   
  },


  // 点击按钮后初始化图表
  init: function (num) {
    wx.hideLoading();
    this.setData({
      activeIndex: num
    })
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart,num);
     
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  dispose: function () {
    if (this.chart) {
      this.chart.dispose();
    }

    this.setData({
      isDisposed: true
    });
  }
});

function setOption(chart, num) {
  let option;
  let dataArr = dataList;

  option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE"],
    legend: {
      data: ['预约人数', '取消人数', '服务人数']
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [{
      label: {
        normal: {
          fontSize: 12,
        }
      },
      name:'ww',
      type: 'pie',
      selectedMode: 'single',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: dataArr,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };


  chart.setOption(option);
}