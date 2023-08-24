import { app,BrowserWindow,screen } from "electron";
import {win} from "./index"
import path from 'path'
import is from "electron-is";

// let vipWin: Electron.CrossProcessExports.BrowserWindow|undefined;
export let miniWin: BrowserWindow | undefined;

export  function CreateMiniWin(){
    miniWin = new BrowserWindow({
        width: 320,
        height: 80,
        // alwaysOnTop: true,
        frame: false,
        useContentSize: true,
        alwaysOnTop: true,
        resizable:false,
        show: false, 
        webPreferences: {
            // enableRemoteModule:true,
            contextIsolation: false,
            nodeIntegration: true,
            webviewTag:true,
            nodeIntegrationInWorker: true
            //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })
    require('@electron/remote/main').enable(miniWin.webContents)
    if (!is.dev()) {
        miniWin.loadFile(path.join(__dirname, "../dist/index.html"), {
            hash: "/mini/clockmini"
          });
        // miniWin.webContents.openDevTools();
    } else {
//VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
        // win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`)
        miniWin.loadURL("http://localhost:3002/#/mini/clockmini");
        // miniWin.loadFile(path.join(__dirname, "../dist/index.html"));
        
        miniWin.webContents.openDevTools();
    }
    miniWin.setSkipTaskbar(true)
    //设置窗口位置
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const x = width - miniWin.getSize()[0]-20; // x 坐标
    const y = 20; // y 坐标
    miniWin.setPosition(x, y);
    // 隐藏默认右键菜单
    //关闭因为css: -webkit-app-region: drag;   引起的默认鼠标右键菜单
    //这里是关闭这个鼠标右键功能
    // miniWin.hookWindowMessage(278,function(e){
    //     miniWin?.setEnabled(false);//窗口禁用
    // setTimeout(()=>{
    //     miniWin?.setEnabled(true);//窗口启用
    // },100);
    // return true;
    // })
}