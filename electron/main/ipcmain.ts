import { dialog, ipcMain,screen } from "electron";
import {win} from "./index"
import {miniWin} from "./miniwin"

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
    ipcMain.on('miniwindow-open',(e, msg) => {
        win?.hide();
        miniWin?.show()
    })
    ipcMain.on("fullWin",(e, msg) => {
        win?.show()
        miniWin?.hide()
    })  
    ipcMain.on("hideMiniWin",(e, msg) => {
        miniWin?.hide()
    })
    ipcMain.on("exit",(e, msg) => {
        win?.webContents.send("shutdownServer","closeServer");
        miniWin?.destroy();
        win?.destroy()
    })
    
    // 移动窗口----start
    ipcMain.on("win-start", (e) => {
        const winPosition = miniWin!.getPosition();
        const cursorPosition = screen.getCursorScreenPoint();
        let x = cursorPosition.x - winPosition[0];
        let y = cursorPosition.y - winPosition[1];
        e.returnValue = JSON.stringify({ x, y });
    });
    ipcMain.on("win-move", (_, params) => {
        miniWin?.setContentSize(320,80)
        const param = JSON.parse(params);
        miniWin!.setPosition(param.x, param.y, true);
    });
  // 移动窗口----end  
}
