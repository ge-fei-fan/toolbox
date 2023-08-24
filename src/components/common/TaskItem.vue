<template>
    <div  @dblclick="openVideo(filepath,title,status)" class="cursor-pointer grid grid-rows-2 grid-cols-4 gap-2 border border-gray-300 rounded-lg p-2 mb-2 hover:border-indigo-500 hover:border-2">
        <p class="col-start-1 col-end-3 truncate" :title="title"> {{title}} </p>
        <div class="flex justify-end"><el-tag>{{ quality }}</el-tag></div>
        <div class="grid grid-cols-4 hover:bg-indigo-200 col-start-4 border border-gray-300 rounded-full px-1">
            <div class="flex justify-center items-center" @click="openDirectory(filepath)">
                <el-tooltip
                content="打开文件夹"
                placement="top"
                >
                    <IconPark :icon="FolderOpen" size="16" theme="outline"/>
                </el-tooltip>
            </div>
            <div class="flex justify-center items-center" @click="deleteItem(id)">
                <el-tooltip
                content="删除"
                placement="top"
                >
                    <IconPark :icon="Delete" size="16" theme="outline"/>
                </el-tooltip>
            </div>
            <div class="flex justify-center items-center" @click="reDownload(cid)">
                <el-tooltip
                content="重新下载"
                placement="top"
                >
                    <IconPark :icon="Redo" size="16" theme="outline"/>
                </el-tooltip>
            </div>
            <div class="flex justify-center items-center" @click="Click(id)">
                <el-tooltip
                content="查看详情"
                placement="top"
                >
                    <IconPark :icon="Attention" size="16" theme="outline"/>
                </el-tooltip>
            </div>
        </div>
        <div class="py-2 col-span-4">
            <el-progress
             :percentage="progress"
             :show-text="false"
             status="success"
             :color="color(status)"
            >
            </el-progress>
        </div>
    </div>

    <el-drawer
    v-model="info"
    title="详情"
    direction="rtl"
    size="50%"
    >
    <div>视频名称：{{ video?.title }}</div>
    <div>视频作者：{{ video?.owner }}</div>
    <div>存储地址：{{ video?.savePath }}</div>
    <div>视频大小：{{ video?.totalBytes }}</div>
    <div v-if="status==-1">失败原因：{{ video?.result }}</div>
    </el-drawer>
</template>

<script setup lang="ts">
import {Redo,Attention,Experiment,FolderOpen, Delete} from '@icon-park/vue-next'
import colors from '@/utils/colors.json'
import {useReDownload,useDeleteItem, useVideoDetail} from "@/utils/api";
import {openItem} from "@/utils/navite";
import { ElMessage,ElNotification } from 'element-plus'
import { useBiliAccountStore } from "@/stores/bilibili";
import path from 'path';
import { ref } from 'vue';
import type { collectVodeo, videoItem } from '@/models/bilibili';
import { useBiliMenu } from '@/views/bilibili/BilibiliController';
const info = ref(false)
const video = ref<videoItem|null>(null)
defineProps<{
  progress:number,
  title: string,
  status :number,
  cid:number,
  filepath:string,
  id :number,
  quality:string,
}>()
const AccountStore =  useBiliAccountStore()
const BiliMenu = useBiliMenu()
const  Click = async (id:number)=>{
    info.value = true
    const res = await useVideoDetail(id)
    if (res.code == 0) {
        video.value = res.data
    }else{
        ElMessage.error({
            message:res.msg,
        });
    }
}
const reDownload = async(c:number)=>{
   const res = await useReDownload(c)
   if (res.code!=0){
    console.log(res.msg)
    ElMessage.error({
        message:res.msg,
    });
   }
}
const openVideo =async (p:string,t:string,s:number) => {
    if (s !=0){
        return
    }
    const v =t+".mp4"
    const videoPath = path.join(p,v)
    console.log(videoPath)
    const result = await openItem(videoPath)
    if (result) {
        ElMessage.error({
        message:"打开文件失败",
        });
    }
}
const openDirectory =async (p:string) => {
    const result = await openItem(p)
    if (result) {
        ElMessage.error({
        message:"文件不存在",
        });
    }
}
const deleteItem=async (params:number) => {
    const res = await useDeleteItem(params)
    if (res.code==0){
        await BiliMenu.reFresh()
        ElMessage.success({
            message:res.msg,
        });
    }else {
        ElMessage.error({
            message:res.msg,
        });
    }

}
const color =(s:number) =>{
    switch(s){
        case 1:
            return colors["video"];
        case 2:
            return colors["audio"];
        case 3:
            return colors["merge"];
        case 0:
            return colors["complete"]
        case -1:
            return colors["error"]
        default:
            return colors["complete"]
    }
    
}


</script>

<style lang="scss" scoped>
</style>