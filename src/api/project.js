import request from '../utils/https';

//获取历史图片
export const getHistoryImage = (params) =>
  request({
    method: "get",
    url: "/api/studio/works",
    params,
  });

//获取生成图片的任务ID
export const getStudioProjectID = (data) =>
  request({
    method: "post",
    url: "/api/studio/works",
    data,
  });

//查询任务ID执行结果
export const getStudioProjectResult = (id) =>
  request({
    method: "get",
    url: `/api/task/${id}`,
  });

//轮播图中的上传功能
export const uploadStudioImage = (data) =>
  request({
    method: "post",
    url: "/api/studio/works/upload",
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  });
