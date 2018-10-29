import WxValidate from './assets/plugins/wx-validate/WxValidate'
import WxService from './assets/plugins/wx-service/WxService'
import HttpResource from './helpers/HttpResource'
import HttpService from './helpers/HttpService'
import __config from './etc/config'
import wxItools from './assets/plugins/wx-itools/wx-itools.js'

App({
  onLaunch() {
  },
  onLoad() {
  },
  onShow() {
    
    if (wx.getStorageSync('userInfo')) {
      wx.switchTab({
        url: 'pages/index/index'
      })
    } else {
      wx.reLaunch({
        url: 'pages/login/login'
      })
    }

  },
  onHide() {
  },
  globalData: {
    userInfo: null,
    userCode: null,
    orderActive:1
  },
  wxCharLogin() {
    const userCode = this.globalData.userCode;
    this.HttpService.getRequest(this.__config.InterfaceUrl.loginurl, {
      barber: userCode
    }).then(data => {
      console.log(JSON.stringify(data)+'**********************')

      // if (!this.WxService.getStorageSync('token')) {
      //   this.WxService.setStorageSync('token', data.data.body.token);
      // } else {
      //   return
      // };
    })
  },
  renderImage(path) {
    if (!path) return ''
    if (path.indexOf('http') !== -1) return path
    return `${this.__config.basePath}${path}`
  },
  WxValidate: (rules, messages) => new WxValidate(rules, messages),
  HttpResource: (url, paramDefaults, actions, options) => new HttpResource(url, paramDefaults, actions, options).init(),
  HttpService: new HttpService({
    baseURL: __config.basePath,
  }),
  WxService: new WxService,
  __config,
  wxItools,
})