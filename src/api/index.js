// 包含多个接口请求函数的模块

import ajax from "./ajax"

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash)=> ajax(`/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategory = ()=> ajax('/index_category')
// 3、根据经纬度获取商铺列表
export const reqShopList = (latitude,longitude)=> ajax('/shops',{latitude,longitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = ()=> ajax()
// 5、获取一次性验证码
export const reqAuthCode = ()=> ajax()
// 6、用户名密码登陆
export const reqUserLogin = ()=> ajax()
// 7、发送短信验证码
export const reqMsgCode = ()=> ajax()
// 8、手机号验证码登陆
export const reqCodeLogin = ()=> ajax()
// 9、根据会话获取用户信息
export const reqGetUsers = ()=> ajax()
// 10、用户登出
export const reqLogout = ()=> ajax()
