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

//发现和推荐
export const getTemplate = (data) =>
  request({
    method: "post",
    url: "/doc/template",
    data,
  });
