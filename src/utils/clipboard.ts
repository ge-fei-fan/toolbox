import { clipboard, dialog, getCurrentWindow } from "@electron/remote";
import { useDownloadVideo, useGetConfig } from "./api"
import { ipcRenderer } from "electron";
import { showNotifications } from "./navite";

//判断是否开启粘贴板
export let clipboardTimer: NodeJS.Timer | null = null;
let history:string =""
export const userClipboardInit = async() => {
    
    const {data} = await useGetConfig()
    if (data.bilibili["auto-download"]){
        //启动定时器
        console.log('开启监控剪贴板')
        clipboardTimer = setInterval(parseText, 1000)
    }
}

const parseText=()=>{
    const text = clipboard.readText()
    // console.log(text)
    if(text== 'undefined'){
        return 
    }
    if(text==history){
        // console.log("重复")
        return
    }
    // console.log(history)
    history=text
    // const str = 'https://www.bilibili.com/video/BV1Kz4y117Ld'
    const pattern = /https:\/\/www\.bilibili\.com.*/
    const matchedStr = text.match(pattern)
    // console.log(matchedStr?.[0]) 
    if(matchedStr?.[0]){
        console.log("发现视频")
        // ipcRenderer.send("video-MessageBox", { name: "111111" }); 
        // ipcRenderer.send("windowsShow")
        ipcRenderer.send("setwindowsTop")
        let win =getCurrentWindow()
        win.focus
        dialog.showMessageBox(win,{
            type: "info",
            title: "下载",
            noLink:true,
            message: "检测到链接,是否下载",
            buttons:["取消","确定"],
          }).then((index)=>{
            if(index.response === 1){
                console.log('You click ok.');
                useDownloadVideo(matchedStr?.[0]).then((res)=>{
                    if(res.code==0){
                        showNotifications("bilibili",matchedStr?.[0]+"开始下载")
                    }else{
                        showNotifications("bilibili",res.msg)
                    }
                })
            } else {
                console.log('You click cancel');
            }
        }).finally(()=>{
            ipcRenderer.send("cancelwindowsTop")
        })
    }
}
export const startClipboard = async() => {
    if (clipboardTimer==null){
        console.log('开启监控剪贴板')
        clipboardTimer = setInterval(parseText, 1000)
    } 
}
export const stopClipboard = async() => {
    
    if (clipboardTimer!=null){
        console.log('停止监控剪贴板')
        clearInterval(clipboardTimer);
        clipboardTimer =null
    }
    
}