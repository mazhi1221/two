import request from '../utils/https';

//根据文字及图片创造
export const createStudioWorks = (data) =>
  request({
    method: "post",
    url: "/api/studio/works",
    data,
  });
