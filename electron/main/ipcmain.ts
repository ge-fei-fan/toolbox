import { dialog, ipcMain } from "electron";
import {win} from "./index"

export default function initIpc() {
    ipcMain.on("video-MessageBox", (e, msg) => {  
        // console.log(msg);
        win?.focus();
        if (!win){
            return
        }
        dialog.showMessageBox(win,{
            type: "info",
            title: "下载",
            noLink:true,
            message: "检测到链接,是否下载",
            buttons:["取消","确定"],
          }).then((index)=>{
            if(index.response === 1){
                console.log('You click ok.');
            } else {
                console.log('You click cancel');
            }
        })
    });
    ipcMain.on("setwindowsTop",(e, msg) => {
        if (win?.isAlwaysOnTop()){
            return
        }
        win?.setAlwaysOnTop(true)
    })
    ipcMain.on("cancelwindowsTop",(e, msg) => {
        if (win?.isAlwaysOnTop()){
            win?.setAlwaysOnTop(false)
        }
    })
    ipcMain.on("windowsShow",(e, msg) => {
        win?.isVisible() ? win.focus() : win?.show()
    })
    ipcMain.on('window-min',(e, msg) => {
        win?.minimize();
    })
    ipcMain.on('window-close',(e, msg) => {
        win?.close();
    })
      
}
