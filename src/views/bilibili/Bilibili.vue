<template>
  <div class="pl-5 bilibili grid grid-cols-3 gap-4">
    <div class="col-span-2">
      <!-- <h1 class=" text-lg font-bold pt-8 pb-3 ">B站下载管理</h1> -->
      <el-affix target=".bilibili" :offset="56">
        <div class="bg-view pb-4 grid grid-cols-2">
          <el-tabs v-model="currentMenu" @tab-click="onTabClick">
            <el-tab-pane v-for="menu in menus" :key="menu.name" :label="menu.label" :name="menu.name"/>
          </el-tabs>
          <div class="flex p-2">
            <el-input  placeholder="请输入链接" v-model="videoUrl" @keyup.enter.native="AccountStore.downloadVideo" :suffix-icon="Download" clearable></el-input>
            <!-- <el-button plain>添加用户</el-button> -->
          </div>
          
        </div>
      </el-affix>
      <div >
        <ElScrollbar height="600px">
          <el-empty :image="NoData" :image-size="350" description=" " v-if="videoIsEmpty()"/>
          <TaskItem
          v-else
          v-for="task in videoList"
          :quality=task.quality
          :title=task.title 
          :progress=task.progress
          :status=task.status
          :cid="task.cid"
          :filepath="task.path"
          :id="task.id"
          >
          </TaskItem>
        </ElScrollbar>
      </div>
    </div>
    <div class="h-screen bg-main grid grid-rows-4 grid-cols-1">
    <div class="row-span-1 p-4">
    <el-card >
      <div class=" flex  place-content-center	py-4">
      <ElAvatar :size="70" round class="bg-gray-200" :src="isLogin? avatarUrl:''"></ElAvatar>
      </div>
      <div class=" flex  justify-center cursor-pointer hover-text">
        <span class="  text-s" v-if="isLogin">{{ profile.data.uname }}</span> 
        <span class="  text-s" @click="showLoginDialog" v-else>登录</span> 
      </div>
    </el-card>
    </div>
      
      <!-- 登录弹窗 -->
      <el-dialog center @close="closeDialog" v-model="showLogin" title="请扫描二维码" width="500px" append-to-body>
        <div class="flex justify-center">
          <qrcode-vue :value="qrUrl" :size="size" level="H" />
        </div>
      </el-dialog>
      
      <div class="flex flex-col row-span-3 px-4 pb-4 gap-1">  
        <div class="flex justify-center items-center gap-4">
          <div class="flex justify-between items-center p-0.5 bg-white border  rounded w-96">
            <el-input  
              size="small"
              v-model="collectUserInput"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input>
            <button @click="AccountStore.addCollectUser" type="button" class="ml-1 btn bg-gray-200 hover:bg-gray-300 px-3 p-1 text-sm rounded">
                <IconPark :icon="PeoplePlus" size="16" theme="multi-color"/>
            </button>
          </div>  
          <div @click="showCollectUserDialog">
              <el-tooltip
              content="查看所有用户"
              placement="top"
              >
                  <IconPark :icon="Find" size="20" theme="outline"/>
              </el-tooltip>
          </div>
          <el-dialog  v-model="showCollectUser" title="采集用户" width="800px" append-to-body>
            <div class="h-96">
              <el-table :data="collectUsers" height="320">
                <el-table-column property="name" label="用户" width="150" />
                <el-table-column label="已采集视频" width="150">
                  <button>查看</button>
                </el-table-column>
                <el-table-column property="is_collect" label="是否采集" width="200" >
                  <template #default="scope">
                    <el-tag v-if="scope.row.is_collect">开启</el-tag>
                    <el-tag v-else type="danger">停止</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" >
                  <template #default="scope">
                    <el-button size="small" v-if="scope.row.is_collect" @click="AccountStore.changeCollectUser(scope.row.ID)">停止</el-button>
                    <el-button size="small" v-else @click="AccountStore.changeCollectUser(scope.row.ID)">开启</el-button>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-dialog>
        </div> 
      <ElScrollbar >
        <el-card>
          <div v-infinite-scroll="load" >
            <el-timeline>
              <el-timeline-item
                v-for="(video, index) in collectVideos"
                :key="index"
                color="#626aef"
                center
                placement="top"
                :timestamp="formatDate(video.CreatedAt)"
              >
                <el-card class="">
                  <div class="text-s	truncate font-light" :title="video.title">{{ video.title }}</div>
                  <div class="flex  justify-between items-center ">
                    <div class="py-2 flex  justify-start items-center ">
                      <IconPark :icon="Star" size="14" theme="multi-color"/>
                      <div class="ml-1 truncate text-xs">{{ video.BilibiliCollect.name }}</div>
                    </div>
                    <div class="py-2 flex  justify-start items-center ">
                      <IconPark :icon="Time" size="14" theme="multi-color"/>
                      <div class="ml-1 text-xs">{{formatDate2(video.created) }}</div>
                    </div>
                  </div>
                </el-card>
                
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
      </ElScrollbar>
    
    </div>
    
    </div>


  </div>
  </template>
  
  <script setup lang="ts">
  import {PeoplePlus,Find,Star,Time, Sleep} from '@icon-park/vue-next'
  import { onBeforeUnmount, onDeactivated, onMounted,onUnmounted,ref} from "vue";
  import {useBiliMenu} from "@/views/bilibili/BilibiliController";
  import { useBiliAccountStore } from "@/stores/bilibili";
  import {storeToRefs} from "pinia";
  import QrcodeVue from 'qrcode.vue'
  import TaskItem from "@/components/common/TaskItem.vue";
  import {NoData} from "@/assets/img"
  import { Download,Search } from '@element-plus/icons-vue'
  import { Menu, getCurrentWindow } from "@electron/remote";
  import type { MenuItemConstructorOptions } from "electron/renderer";
  import RightClickManager from "@/utils/rightclick"

  const {isLogin, profile, showLogin,qrUrl,videoList,videoUrl,collectVideos,collectUserInput,collectVideosTotal,collectUsers} = storeToRefs(useBiliAccountStore())
  const AccountStore =  useBiliAccountStore()
  const {menus, currentMenu, onTabClick} = useBiliMenu()
  const avatarUrl = "http://i1.hdslb.com/bfs/face/6b23c4ad3d9870dd1f6f2cb483d646fa5b28cdf0.jpg"
  let collectPage: number = 1;
  const showCollectUser = ref(false)
  const  menuTemplate:MenuItemConstructorOptions[]= [
      {label: '全选',role: 'selectAll'},
      {label: '剪贴',role: 'cut'},
      {label: '复制',role: 'copy'},
      {label: '粘贴',role: 'paste'}
    ];

  // 构建菜单项
  const rightmenu =  Menu.buildFromTemplate(menuTemplate);
  const rightClickManager = RightClickManager.getInstance(rightmenu);
  onMounted(async () => {
    AccountStore.videlist(1);
    videoIsEmpty();
    await AccountStore.bilibiliAccount();
    await AccountStore.getVideoList(1);
    collectVideos.value =[];
    await AccountStore.collectVideo(1);
    rightClickManager.startListening();
  });
  onDeactivated(() => {
    console.log("onDeactivated")
  });
  onUnmounted(() => {
    AccountStore.closeTimer("video")
    // console.log("onUnmounted")
  });
  onBeforeUnmount(() => {
    console.log("onBeforeUnmount")
    rightClickManager.stopListening();
  })
  
  
  //采集模块滚动到底部加载
  const load =()=>{
    collectPage ++
    if (collectPage>collectVideosTotal.value){
      collectPage --
      return
    }
    AccountStore.collectVideo(collectPage);
  }

  // 格式化时间
  const formatDate = (dateString:string)=> {
    const date = new Date(dateString);
    const options:Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'Asia/Shanghai'
    };
    return date.toLocaleString('zh-CN',options);
  }
  const formatDate2 = (timestamp:number) =>{
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
  }
  const size = 200;
  const showLoginDialog = () => {
    showLogin.value = true;
    AccountStore.getQr();
    AccountStore.pullQr()
  }
  const closeDialog =()=>{
    AccountStore.closeTimer("qr")
  }
  const showCollectUserDialog =async () => {
    showCollectUser.value = true;
    await AccountStore.CollectUser()
  }
  const videoIsEmpty=()=>{
    return videoList.value.length == 0
  }

</script>
  <style lang="scss">
  // .el-table--enable-row-hover .el-table__body tr:hover>td{
  //   background-color: #212e3e !important;
  // }
  // .el-table__empty-block {
  //   background-color: #0e192a;
  // }
  // .table-wrapper ::v-deep .el-table td {
  //   border-bottom: 0px solid #dfe6ec !important;
  // }

  .bilibili {
      .el-tabs__item.is-active{    //切换活动项的文字颜色
        color:#295a01 !important;
    }
    .el-tabs__item{color:rgb(12, 12, 12);}
    .el-tabs__nav-wrap::after {
      height: 0;
    }
    .el-tabs__header{
      @apply m-0;
    }
  }
  .el-timeline-item__tail {
    border-left-width: 1px;
    // border-left-style: solid;
    // border-left-color: rgb(0, 0, 0);
  }
  .el-card  {
    --el-card-padding: 10px;
  }

  </style>
  