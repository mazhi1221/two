<template>
  <div class="drawingBoard">
    <div class="toolArea">
      <div class="toolAreaInner">
        <breathe-word>我的画板</breathe-word>
        <div class="feature">
          <div class="title">形状</div>
          <ul class="paintShape">
            <li
              v-for="(item, index) in paintShapeList"
              :key="item.name"
              :title="item.name"
              :class="{ active: paintShape === item.name }"
              @click="paintShape = item.name"
            >
              <span :class="['iconfont', item.icon]"></span>
            </li>
          </ul>
        </div>
        <div class="feature">
          <div class="title">线宽</div>
          <el-slider v-model="lineWidth" />
        </div>
        <div class="feature">
          <div class="title">填充类型</div>
          <el-radio-group v-model="paintType">
            <el-radio label="fill" size="small" border>填充</el-radio>
            <el-radio label="stroke" size="small" border>轮廓</el-radio>
          </el-radio-group>
        </div>
        <div class="feature">
          <div class="title">轮廓颜色</div>
          <el-input type="color" v-model="strokeColor" @change="paintType = 'stroke'"/>
        </div>
        <div class="feature">
          <div class="title">填充颜色</div>
          <el-input type="color" v-model="fillColor" @change="paintType = 'fill'"/>
        </div>
        <div class="operate">
          <el-button link type="primary" @click="clearDrawingBoard">清空</el-button>
          <el-button link type="primary" @click="saveToImage">下载</el-button>
        </div>
      </div>
    </div>
    <div class="paintArea" id="paintArea">
      <canvas
        id="canvas"
        :width="width - 22"
        :height="height - 22"
        @mousedown="onmousedown($event)"
      ></canvas>
    </div>
  </div>
</template>
<script setup>
import BreatheWord from "./components/breatheWord.vue"
import { nextTick } from 'vue';

let paintShape = $ref("绘画");
const paintShapeList = [
  { name: "绘画", icon: "icon-sharpicons_pen" },
  { name: "直线", icon: "icon-line" },
  { name: "三角形", icon: "icon-xingzhuang-sanjiaoxing" },
  { name: "矩形", icon: "icon-xingzhuang-juxing" },
  { name: "圆角矩形", icon: "icon-yuanjiaojuxing" },
  { name: "五角形", icon: "icon-xingzhuang-xingxing" },
  { name: "圆", icon: "icon-xingzhuang-tuoyuanxing" },
  { name: "文本", icon: "icon-xingzhuang-wenzi" },
]

//canvas对象
let canvas, paint, paintArea, width = $ref(0), height = $ref(0);
nextTick(() => {
  canvas = document.getElementById('canvas');
  paint = canvas.getContext("2d");
  paintArea = document.getElementById('paintArea');
  width = paintArea.clientWidth;
  height = paintArea.clientHeight;
})
window.onresize = function() {
  width = paintArea.clientWidth;
  height = paintArea.clientHeight;
}

//canvas绘画对象数据
let paintImageData = $ref({});

//canvas绘画条件
let lineWidth = $ref(1);          //线宽
let paintType = $ref("stroke");   //填充类型
let strokeColor = $ref("#dc1b1b") //轮廓颜色
let fillColor = $ref("#070505");  //填充颜色

let cornerRadius = $ref(20);      //圆角半径
let polyNum = $ref(6);            //多边形边数

const onmousedown = (e) => {
  const { offsetX: x, offsetY: y } = e;
  if (paintShape === '绘画') paint.moveTo(x, y); //绘画轨迹的特殊处理
  canvas.onmousemove = (e) => {
    const { offsetX: x1, offsetY: y1 } = e;
    paint.clearRect(0, 0, width, height);
    paintImageData.hasOwnProperty("data") && paint.putImageData(paintImageData, 0, 0);
    switch (paintShape) {
      case "绘画":
        paintTracks(x, y, x1, y1);
        break;
      case "直线":
        paintLine(x, y, x1, y1);
        break;
      case "三角形":
        polyNum = 3;
        paintPolygon(x, y, x1, y1);
        break;
      case "矩形":
        paintRectangle(x, y, x1, y1);
        break;
      case "圆角矩形":
        paintRoundedRectangle(x, y, x1, y1);
        break;
      case "五角形":
        polyNum = 5;
        paintPolygon(x, y, x1, y1);
        break;
      case "多边形":
        paintPolygon(x, y, x1, y1);
        break;
      case "圆":
        paintCircle(x, y, x1, y1);
        break;
    }
  }
  canvas.onmouseup = (e) => {
    canvas.onmousemove = null;
    if (paintShape === "文本") {
      let input = window.prompt('请输入文字');
      paintText(input, x, y);
    }
    paintImageData = paint.getImageData(0, 0, width, height);
  }
}

//绘画
const paintTracks = (x, y, x1, y1) => {
  paint.lineTo(x1, y1)
  paint.lineWidth = lineWidth;
  paint.strokeStyle = strokeColor;
  paint.stroke();
}

//绘制直线
const paintLine = (x, y, x1, y1) => {
  paint.beginPath();
  paint.moveTo(x,y);
  paint.lineTo(x1,y1);
  paint.lineWidth = lineWidth;
  paint.strokeStyle = strokeColor;
  paint.stroke();
  paint.closePath();
}

//绘制矩形
const paintRectangle = (x, y, x1, y1) => {
  paint.beginPath();
  paint.lineWidth = lineWidth;
  switch(paintType){
    case 'stroke':
      paint.strokeStyle = strokeColor;
      paint.strokeRect(x, y,x1-x,y1-y);
      break;
    case 'fill':
      paint.fillStyle = fillColor;
      paint.fillRect(x, y,x1-x,y1-y);
      break;
  }
  paint.closePath();
}

//绘制圆角矩形
const paintRoundedRectangle = (x, y, x1, y1) => {
  paint.beginPath();
  paint.lineWidth = lineWidth;
  paint.moveTo(x + cornerRadius, y);
  paint.arcTo(x1, y, x1,y + cornerRadius, cornerRadius)
  paint.arcTo(x1, y1,x1 - cornerRadius, y1,cornerRadius)
  paint.arcTo(x, y1, x,y1 - cornerRadius, cornerRadius)
  paint.arcTo(x, y,x + cornerRadius, y, cornerRadius)
  paint.closePath();
  switch(paintType){
    case 'stroke':
      paint.strokeStyle = strokeColor;
      paint.stroke();
      break;
    case 'fill':
      paint.fillStyle = fillColor;
      paint.fill();
      break;
  }
}

//绘制多边形
const paintPolygon = (x, y, x1, y1) => {
  paint.beginPath();
  paint.lineWidth = lineWidth;
  let r = Math.sqrt(Math.pow(x1 - x,2) + Math.pow(y1 - y,2))
  let deg = 360 / polyNum * Math.PI/180;
  for(let i = 0; i < polyNum; i++){
    paint.lineTo(x + Math.cos(deg * i)*r,y + Math.sin(deg * i) * r)
  }
  paint.closePath();
  switch(paintType){
    case 'stroke':
      paint.strokeStyle = strokeColor;
      paint.stroke();
      break;
    case 'fill':
      paint.fillStyle = fillColor;
      paint.fill();
      break;
  }
}

//绘制圆
const paintCircle = (x, y, x1, y1) => {
  paint.beginPath();
  paint.lineWidth = lineWidth;
  let r = Math.sqrt(Math.pow(x1 - x,2) + Math.pow(y1 - y,2))
  paint.arc(x, y, r,0,Math.PI*2)
  paint.closePath();
  switch(paintType){
    case 'stroke':
      paint.strokeStyle = strokeColor;
      paint.stroke();
      break;
    case 'fill':
      paint.fillStyle = fillColor;
      paint.fill();
      break;
  }
}

const paintText = (input, x, y) => {
  paint.font='20px 宋体 bold';
  paint.textAlign='left';
  switch(paintType){
    case 'stroke':
      paint.strokeStyle = strokeColor;
      paint.strokeText(input, x, y);
      break;
    case 'fill':
      paint.fillStyle = fillColor;
      paint.fillText(input, x, y);
      break;
  }
}

const clearDrawingBoard = () => {
  paint.clearRect(0, 0, width, height);
  paintImageData = {};
  paintShape = "直线";
}

const saveToImage = () => {
  let url = canvas.toDataURL('image/png');
  let arr = url.split(","),
    mime = arr[0].match(/:(.*?);/)[1], // 此处得到的为文件类型
    bstr = atob(arr[1]), // 此处将base64解码
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let file = new File([u8arr], "filename", { type: mime });
  let href = URL.createObjectURL(file); // 将file对象转成 UTF-16 字符串
  // 创建一个 a 标签
  let aLinkDom = document.createElement("a");
  aLinkDom.download = file.name; // 设置文件名
  aLinkDom.href = href; // 放入href
  document.body.appendChild(aLinkDom); // 将a标签插入 body
  aLinkDom.click(); // 触发 a 标签的点击
  document.body.removeChild(aLinkDom); // 移除刚才插入的 a 标签
  URL.revokeObjectURL(href); // 释放刚才生成的 UTF-16 字符串
}

</script>
<style lang="scss" scoped>
div.drawingBoard {
  width: 100%;
  height: 100%;
  div.title {
    color: #000000;
    font-size: 10px;
    margin-bottom: 20px;
  }
  div.toolArea {
    float: left;
    width: 200px;
    height: 100%;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    div.toolAreaInner {
      height: 100%;
      border: 1px solid #ccc;
      padding: 10px 0 10px 10px;
      box-sizing: border-box;
      position: relative;
      .feature {
        margin-bottom: 20px;
        >ul.paintShape {
          overflow: hidden;
          >li {
            width: 42px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            margin-bottom: 2px;
            margin-right: 2px;
            border-radius: 5px;
            cursor: pointer;
            transition: all .35s ease;
            float: left;
            span {
              color: #000;
              font-size: 28px;
            }
            &.active {
              background: #7b0caf;
              span {
                color: #fff;
              }
            }
            &:hover {
              background: #7b0caf;
              span {
                color: #fff;
              }
            }
          }
        }
        .el-slider, .el-input, .el-radio-group {
          width: 80%;
          margin-left: 10%;
          .el-radio:first-child {
            margin-right: 5px;
          }
        }
      }
      .operate {
        position: absolute;
        right: 15px;
        bottom: 5px;
      }
    }
  }
  div.paintArea {
    float: left;
    width: calc(100% - 200px);
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    canvas {
      border: 1px solid #ccc;
    }
  }
}
</style>
