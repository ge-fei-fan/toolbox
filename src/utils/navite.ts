
import { shell,ipcRenderer } from 'electron';
import { dialog,app } from '@electron/remote';
import {Notify} from "@/assets/img"

import { ElMessage } from 'element-plus'
import path from 'path';
import { shutdownServer } from './api';
import is from 'electron-is';
import fs from "fs"
import { parseDocument } from "yaml"
import { join } from "path"





export const openItem = async (fullPath:string) => {
  if (!fullPath) {
    return
  }

  const result = await shell.openPath(fullPath)
  return result
}


export const selectDirectory = () =>{
  // dialog.showOpenDialog({
  //   defaultPath:app.getAppPath(),
  //   properties: ['openDirectory'],
  // }).then(({ canceled, filePaths }) => {
  //   if (canceled || filePaths.length === 0) {
  //     return ""
  //   }

  //   const [filePath] = filePaths
  //   return [filePath]
  // }).catch(err => {
  //   ElMessage.error({
  //     message:err,
  // });
  // })
  const filePaths=dialog.showOpenDialogSync({ 
    defaultPath:app.getAppPath(),
    properties: ['openDirectory'] 
  })
  if (filePaths){
    return (filePaths[0])
  }else{
    return ""
  }
  
}

export const showNotifications = (title:string,body:string) =>{
  const NOTIFICATION_TITLE = title
  const NOTIFICATION_BODY = body
  const NOTIFICATION_ICON =Notify
  
  new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY,icon:NOTIFICATION_ICON })
    .onclick = () => { console.log(123123) }
}
export const redderIpcInit = () => {
  ipcRenderer.on("closeServer", (event, arg) => {
    console.log("主进程老哥，主动推消息了：", arg);
    shutdownServer()
  });
  
}

export  function loadConfigYaml() {
  const roamingPath = app.getPath('userData');
  // console.log('Roaming路径:', roamingPath);
  if (is.dev()){
      const file = fs.readFileSync(join(roamingPath,"config.debug.yaml"), "utf8");
      const config = parseDocument(file);
      // console.log(config.getIn(["system", "addr"]));
      // console.log(typeof(config.getIn(["system", "addr"])))
      return config.getIn(["system", "addr"])
  }
  const configPath = join(roamingPath,'config.yaml')
  const file = fs.readFileSync(configPath, "utf8");
  const config = parseDocument(file);
  // console.log(config.getIn(["system", "addr"]));
  // global.sharedObject.addr=config.getIn(["system", "addr"]);  
  return config.getIn(["system", "addr"])
}