import request from '../utils/https';

//登录
export const login = (data) =>
  request({
    method: "post",
    url: "/auth/account/login",
    data,
  });

//退出登录
export const loginOut = (data) =>
  request({
    method: "post",
    url: "/auth/logout",
    data,
  });

//获取手机验证码
export const getSmsCode = (data) =>
  request({
    method: "post",
    url: "/auth/code/sms",
    data,
  });

//获取设计室列表
export const getStudioList = (data) =>
  request({
    method: "get",
    url: "/api/studio/main/tpl",
    data,
  });


