<template>
    <div>
      <ElScrollbar class="pt-8" height="550px">
      <h1 class="pl-10 text-lg   pb-3 ">系统设置</h1>
      <div class="flex justify-center" ><div class=" border-b  border-gray-300 border-opacity-50 w-11/12	"></div></div>
      <div class="flex justify-center pt-5">
        <el-form
          ref="configFormRef"
          :model="ConfigForm"
          label-width="auto"
          label-position="right"
        >
          <el-form-item label="服务器端口:" >
            <el-input style="width: 120px" v-model.number="ConfigForm.port"/>
          </el-form-item>
          <el-form-item label="日志等级:" >
            <el-select v-model="ConfigForm.level">
            <el-option label="调试" value="debug" key="debug"/>
            <el-option label="信息" value="info" key="info" />
            <el-option label="警告" value="warn" key="warn"/>
            <el-option label="错误" value="error" key="error"/>
          </el-select>
          </el-form-item>
          <el-form-item label="日志路径:" >
            <selectDirectory
              :searchDirectory ="logDirectory"
              :logPath="ConfigForm.logPath"
              :OpenDirectory = "logDirectoryOpen"
            ></selectDirectory>
          </el-form-item>
        </el-form>
      </div>
      <h1 class="pl-10 text-lg  pt-8 pb-3 " >哔哩哔哩</h1>
      <div class="flex justify-center" ><div class=" border-b  border-gray-300 border-opacity-50 w-11/12	"></div></div>
      <div class="flex justify-center pt-5">
        <el-form
          ref="configFormRef"
          :model="ConfigForm"
          label-width="auto"
          label-position="right"
        >
          <el-form-item label="视频管理:" >
            <el-checkbox v-model="ConfigForm.autodownload" label="监听粘贴板"/>
            <el-checkbox v-model="ConfigForm.collect" label="采集视频" />
          </el-form-item>
          <el-form-item  label="视频保存路径:" >
            <selectDirectory
              :searchDirectory ="videoDrectory"
              :logPath="ConfigForm.bilibiliPath"
              :OpenDirectory = "videoDirectoryOpen"
            ></selectDirectory>
          </el-form-item>
        </el-form>
      </div>
      <h1 class="pl-10 text-lg  pt-8 pb-3 " >高德</h1>
      <div class="flex justify-center" ><div class=" border-b  border-gray-300 border-opacity-50 w-11/12	"></div></div>
      <div class="flex pl-48 pt-5 w-full">
        <el-form
          ref="configFormRef"
          :model="ConfigForm"
          label-width="auto"
          label-position="right"
        >
          <el-form-item label="高德KEY:" >
            <el-input style="width: 320px" v-model.number="ConfigForm.port"/>
          </el-form-item>
        </el-form>
      </div>
      <h1 class="pl-10 text-lg  pt-8 pb-3 " >更新</h1>
      <div class="flex justify-center" ><div class=" border-b  border-gray-300 border-opacity-50 w-11/12	"></div></div>
      <div class="flex pl-48 pt-5">
        <el-form
          ref="configFormRef"
          :model="ConfigForm"
          label-width="auto"
          label-position="left"
          :inline="true"
        >
          <el-form-item label="更新设置:" >
            <el-checkbox v-model="ConfigForm.autoUpdate" label="自动更新"/>
          </el-form-item>
        </el-form>
        <div ><el-button type="danger" :loading="load" @click="update">检查更新</el-button></div>
      </div>
      </ElScrollbar>
      <div class="fixed bottom-0 right-0 p-16">
        <el-button color="#626aef" @click="submitForm(configFormRef)" >保存</el-button>
        <el-button @click="aaa">取消</el-button>
      </div>
      
      <!-- 更新进度条弹窗 -->
      <el-dialog class="custom-dialog" v-model="dialogUpdateVisible" title="正在下载更新">
        <el-progress :show-text="false" :stroke-width="26" :percentage="downloadProgress" />
      </el-dialog>
    </div>
     
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config'
import { selectDirectory,openItem } from '@/utils/navite'
import { storeToRefs } from 'pinia'
import { initCustomFormatter, onBeforeMount, onMounted, reactive, ref } from 'vue'
import SelectDirectory from "@/components/common/SelectDirectory.vue";
import type { FormInstance } from 'element-plus';
import { useGetConfig } from "@/utils/api";
import { ipcRenderer } from 'electron';



const {conf,autodownload} = storeToRefs(useConfigStore())
const ConfigStore = useConfigStore()

const configFormRef = ref<FormInstance>()
onBeforeMount( async() => {
  await getConfigData()
  
})
const aaa=()=>{
  // console.log(111)
  // ipcRenderer.send("video-MessageBox", { name: "111111" });
  // ipcRenderer.send("setwindowsTop")
  // ipcRenderer.send("checkForUpdate")
  dialogUpdateVisible.value=true
}
const load = ref(false)
const update=()=>{
  ipcRenderer.send("checkForUpdate")
  load.value=true
}
const getConfigData = async()=>{
  const{data} = await useGetConfig()
  ConfigForm.bilibiliPath = data.bilibili['download-path']
  ConfigForm.autodownload = data.bilibili['auto-download']
  ConfigForm.collect = data.bilibili.collect
  ConfigForm.level =data.zap.level
  ConfigForm.port = data.system.addr
  ConfigForm.logPath = data.zap.director
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ConfigForm)
      conf.value={
        zap:{
            level:ConfigForm.level,
            director:ConfigForm.logPath
        },
        system:{
            addr:ConfigForm.port,
        },
        bilibili:{
            collect:ConfigForm.collect,
            "auto-download":ConfigForm.autodownload,
            "download-path":ConfigForm.bilibiliPath
        }
      }
      console.log('submit!')
      ConfigStore.updateConfig()

    } else {
      console.log('error submit!', fields)
    }
  })
}
const logDirectory= ()=>{
  const filePath =  selectDirectory()
  if (filePath ===""){
    return
  }
  console.log(filePath)
  ConfigForm.logPath=filePath
}
const logDirectoryOpen= ()=>{
  openItem(ConfigForm.logPath)
}

const videoDrectory= ()=>{
  const filePath =  selectDirectory()
  if (filePath ===""){
    return
  }
  console.log(filePath)
  ConfigForm.bilibiliPath=filePath
}
const videoDirectoryOpen= ()=>{
  openItem(ConfigForm.bilibiliPath)
}
const ConfigForm = reactive({
  bilibiliPath:"",
  logPath:"",
  port:0,
  collect:false,
  autodownload:false,
  level:"info",
  autoUpdate:false
})
// const ConfigForm = reactive({
//     bilibiliPath:bilibiliPath.value,
//     logPath:logPath.value,
//     port:port.value,
//     collect:collect.value,
//     autodownload:autodownload.value,
//     level:level.value
//   })

//检查更新通知
ipcRenderer.on('getVersion', (event, message) => {
    load.value=false
}); 

const dialogUpdateVisible = ref(false)
const downloadProgress = ref(0)
//确认下载
ipcRenderer.on('checkUpdate', (event, message) => {
  dialogUpdateVisible.value=true
}); 
//下载进度通知
ipcRenderer.on('downloadProgress', (event, message) => {
  console.log('Received message from main process:', message);
  downloadProgress.value = message.percent
});
ipcRenderer.on('updateDownloaded', (event, message) => {
  dialogUpdateVisible.value=false
});  
</script>

<style lang="scss" >
.el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
 
.el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
}
</style>