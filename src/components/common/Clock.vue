<template>
    <div class="timeBox" >
      <div class="clockBox">
        <canvas ref="canvas" height="60" width="60"></canvas>
      </div>
      <div class="timeItem">
        <div class="time">{{ time.time }}</div>
        <div class="second">{{ time.second }}</div>
      </div>
      <div class="dateItem">
        <div class="week">{{ time.week }}</div>
        <div class="date">{{ time.date }}</div>
      </div>
    </div>
  </template>
   
  <script lang="ts" setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import dayjs from 'dayjs';
    import RightClickManager from '@/utils/rightclick';
    import { Menu } from '@electron/remote';
    import { ipcRenderer } from 'electron';
    import type { MenuItemConstructorOptions } from 'electron/renderer';
    //右键
    const fullmode=()=>{
        ipcRenderer.send("fullWin")
    }
    const hideMiniWin=()=>{
        ipcRenderer.send("hideMiniWin")
    }
    const exit=()=>{
        ipcRenderer.send("exit")
    }
    const  menuTemplate:MenuItemConstructorOptions[]= [
        {label: '完整模式',click: fullmode},
        {label: '关闭小窗模式',click: hideMiniWin},
        {label: '退出',click: exit}
        ];
    // 构建菜单项
    const rightmenu =  Menu.buildFromTemplate(menuTemplate); 
    const rightClickManager = RightClickManager.getInstance(rightmenu);
    // onMounted(async () => {
    //     rightClickManager.startListening();
    // });
    // onBeforeUnmount(() => {
    //     rightClickManager.stopListening();
    // })
    //
    const timer: any = ref(null);
    const time: any = ref({});
    const getDate = () => {
      time.value = parseTime(new Date());
      console.log(21, time.value);
    };
    // 根据传入的时间，处理成需要的对象函数
    const parseTime = (time: string | number | Date | dayjs.Dayjs | null | undefined) => {
      draw(time);
      let resObj: any = {};
      let week = ['日', '一', '二', '三', '四', '五', '六'];
      resObj.date = dayjs(time).format('YYYY年MM月DD日');
      resObj.week = `星期${week[dayjs(time).day()]}`;
      resObj.time = dayjs(time).format('HH:mm');
      resObj.second = dayjs(time).format('ss');
      return resObj;
    };
    const canvas = ref();
    //描绘时分秒小数和小数点
    // 绘制表盘
    const radius = 30;
    const cWidth = 60;
    const drawBackground = () => {
      ctx.value.save();
      // ctx.value.translate(radius, radius); //中心原点位置
      const width = cWidth;
      const height = cWidth;
      const R = width / 2; //圆半径
      const r = (R / 3) * 2;
      //设置坐标轴原点
      ctx.value.translate(width / 2, height / 2);
      // 圆心
      ctx.value.beginPath();
      // ctx.value.arc(0, 0, 10, 0, 2 * Math.PI, true);
      ctx.value.fill();
      ctx.value.closePath();
      // 表盘刻度（大格）
      ctx.value.beginPath();
      ctx.value.lineWidth = 2;
      for (var i = 0; i < 12; i++) {
        ctx.value.beginPath();
        ctx.value.strokeStyle = 'rgba(255,255,255,1)';
        ctx.value.rotate(Math.PI / 6);
        ctx.value.moveTo(R, 0);
        ctx.value.lineTo(r, 0);
        ctx.value.stroke();
      }
      ctx.value.closePath();
      // 表盘刻度（小格）
      ctx.value.beginPath();
      ctx.value.lineWidth = 1;
      for (var i = 0; i < 60; i++) {
        ctx.value.beginPath();
        ctx.value.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.value.rotate(Math.PI / 30);
        ctx.value.moveTo(R, 0);
        ctx.value.lineTo(R - 10, 0);
        ctx.value.stroke();
      }
      ctx.value.closePath();
    };
   
    //描绘时针
    const drawHour = (hour: number, minute: number) => {
      ctx.value.save();
      ctx.value.beginPath();
      ctx.value.strokeStyle = '#FFFFFF';
      let rad = ((2 * Math.PI) / 12) * hour;
      let mrad = ((2 * Math.PI) / 12 / 60) * minute;
      ctx.value.rotate(rad + mrad);
      ctx.value.lineWidth = 4;
      ctx.value.lineCap = 'round';
      ctx.value.moveTo(0, 10);
      ctx.value.lineTo(0, -radius + 30);
      ctx.value.stroke();
      ctx.value.restore();
    };
    //描绘分针
    const drawMinute = (minute: number) => {
      ctx.value.save();
      ctx.value.beginPath();
      let rad = ((2 * Math.PI) / 60) * minute;
      ctx.value.rotate(rad);
      ctx.value.strokeStyle = '#FFFFFF';
      ctx.value.lineWidth = 3;
      ctx.value.lineCap = 'round';
      ctx.value.moveTo(0, 10);
      ctx.value.lineTo(0, -radius + 20);
      ctx.value.stroke();
      ctx.value.restore();
    };
    //描绘秒针
    const drawSecond = (second: number) => {
      ctx.value.save();
      ctx.value.beginPath();
      ctx.value.fillStyle = '#C14543';
      ctx.value.lineWidth = 2;
      ctx.value.lineCap = 'round';
      let rad = ((2 * Math.PI) / 60) * second;
      ctx.value.rotate(rad);
      ctx.value.moveTo(-2, 20);
      ctx.value.lineTo(2, 20);
      ctx.value.lineTo(1, -radius + 10);
      ctx.value.lineTo(-1, -radius + 10);
      ctx.value.fill();
      ctx.value.restore();
    };
    //中间固定园点
    const drawDot = () => {
      ctx.value.beginPath();
      ctx.value.fillStyle = '#C14543';
      ctx.value.arc(0, 0, 4, 0, 2 * Math.PI, false);
      ctx.value.fill();
    };
    const draw = (now:any) => {
      ctx.value.clearRect(0, 0, cWidth, cWidth);
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      drawBackground();
      drawHour(hour, minute);
      drawMinute(minute);
      drawSecond(second);
      drawDot();
      ctx.value.restore();
    };
   
    const ctx = ref();
    onMounted(() => {
      ctx.value = canvas.value.getContext('2d');
      timer.value = setInterval(() => {
        getDate();
      }, 1000);
      rightClickManager.startListening();
    });
    onBeforeUnmount(() => {
      clearInterval(timer.value);
      timer.value = null;
      rightClickManager.stopListening();
    });


    
  </script>
  <style  lang="scss">
    .timeBox {
      /* width: 60%; */
      width: 100%;
      height: 100%;
      border-radius: 10px;
      margin: 0 auto;
      background: linear-gradient(to right bottom, #7cafe3, #046ac1);
      display: flex;
      padding: 10px 0;
      justify-content: center;
      cursor: default;
      .clockBox {
        width: 70px;
      }
      .timeItem {
        display: flex;
        color: white;
        width: 70px;
        .time {
          font: 30px/50px 'pf';
        }
        .second {
          font: 10px/10px 'pf';
          margin: 25px 0 0 5px;
        }
      }
      .dateItem {
        width: 140px;
        color: white;
        padding-top: 10px;
        padding-left: 40px;
        .week {
          font: 14px/14px 'pf';
        }
        .date {
          margin-top: 10px;
          font: 12px/12px 'pf';
        }
      }
    }
  </style>