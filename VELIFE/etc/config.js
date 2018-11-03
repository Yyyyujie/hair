export default {
	//接口IP
   basePath: 'http://192.168.124.234:8080',
   //basePath:'http://www.zhenlian.site:10001',
  //  basePath: 'https://vjianfa.cn',
	//接口地址
	InterfaceUrl:{
    //我的作品列表
    carlist:'/barber/production/list',
    //登录
    loginurl:'/barber/login',
    //上传作品
    addWork:'/barber/production/add' ,
    //删除作品
    delWork:'/barber/collectionWorksVelife/delete',
    //上传作品的图片
    upload:'/barber/collectionWorksVelife/uploadImg',
    //对我的评价的列表
    evaList:'/barber/comment/list',
    //剪发师信息
    barberInfo:'/barber/user/info',
    //工作经验查询
    experience:'/barber/method/workQuery',
    //删除工作经验
    delExperience:'/barber/method/workResumeDelete',
    //添加工作经验
    addWorkExperience:'/barber/method/workResumeAdd',
    //订单分页查询
    orderList:'/barber/order/list',
    //待服务的预约列表
    orderMember:'/barber/method/getAppointmentList',
    //呼叫
    shout:'/barber/service/call',
    //开始服务
    startService:'/barber/service/start',
    //已完成服务
    endService:'/barber/service/end',
    //打卡
    clock:'/barber/user/updateStatus',
    //查看打卡状态
    checkClock:'/barber/user/signStatus',
    //修改密码
    editPass:'/barber/user/updatePwd',
    //线下支付
    underlinePay:'/barber/order/underlinePay',
    //理发师支付
    orderPay:'/barber/order/pay',
    //更改理发师信息   
    updateBarber:'/barber/user/update',
    //获取当前叫号
    getShowOrder:'/barber/service/show',
    //呼叫下一个
    getNextMember:'/barber/service/next',
    //修改理发师的在线状态
    updateWorkStatus:'/barber/user/updateWorkStatus',
    //业务统计
    achievement:'/barber/statistics/achievement',
    //查询结账情况
    settlement:'/barber/statistics/settlement',
    //理发师的本日结账
    bill:'/barber/statistics/balance',
    //查询理发师本日的结账g
    account:'/barber/statistics/balanceData',
    //参考发型上传图片
    uploadHair: '/barber/hairstyle/hairstyle/add',
    //参考发型列表
    hairList: '/barber/hairstyle/hairstyle/list',
    //复工时间
    reworkTime:'/barber/user/updateReworkTime',
    //理发师重新登录
    againLogin:'/barber/autoLogin'
	},
  //订单状态
  OrderStatus:{
    UNDOSTATUS: '1',//待消费待服务
    DOINGSTATUS: '2',//服务中
    UNPAY: '3',//订单完成未支付
    DONESTATUS: '4',//已完成
    CANCELSTATUS: '5',//已取消
  }
}