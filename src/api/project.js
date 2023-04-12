import request from '../utils/https';

//根据文字及图片创造
export const createStudioWorks = (data) =>
  request({
    method: "post",
    url: "/api/studio/works",
    data,
  });

//轮播图中的上传功能
export const uploadStudioImage = (data) =>
  request({
    method: "post",
    url: "/api/studio/works/upload",
    data,
    headers: {'Content-Type': 'multipart/form-data'}
  });
