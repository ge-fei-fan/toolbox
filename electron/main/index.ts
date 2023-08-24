import { app, BrowserWindow,  ipcMain,  Menu,  Tray } from 'electron'
import path from 'path'
import {  join } from 'path'
import {startEngine} from './engine';
import initIpc from './ipcmain';
import initUpload from './Upload';
import is from 'electron-is';
import { CreateMiniWin, miniWin } from './miniwin';
// import { initialize } from '@electron/remote/main'
//app 控制应用程序的事件生命周期。
//BrowserWindow 创建并控制浏览器窗口。
// process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

export let win: BrowserWindow | undefined;
//定义全局变量获取 窗口实例
const preload = join(__dirname, '../preload/index.js')


const createWindow = () => {
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        // alwaysOnTop: true,
        frame: false,
        useContentSize: true,
        resizable:false,
        webPreferences: {
            // enableRemoteModule:true,
            contextIsolation: false,
            nodeIntegration: true,
            webviewTag:true,
            nodeIntegrationInWorker: true
            //允许html页面上的javascipt代码访问nodejs 环境api代码的能力（与node集成的意思）
        }
    })
    
    require('@electron/remote/main').initialize()
    require('@electron/remote/main').enable(win.webContents)
    
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../dist/index.html"));
        // win.webContents.openDevTools();
    } else {
//VITE_DEV_SERVER_HOST 如果是undefined 换成  VITE_DEV_SERVER_HOSTNAME
        // win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`)
        win.loadURL("http://localhost:3002/");
        win.webContents.openDevTools();
    }
    
    win.setMenu(null); 
    // // 窗口关闭的监听  
    // win.on('closed', (event) => {
    //     console.log(event)
    //     win = null;
    // });
    // 触发关闭时触发
    win.on('close', (event) => {
        // 截获 close 默认行为
        event.preventDefault();
        // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
        win?.hide();
        win?.setSkipTaskbar(true);

    });
    // let tray = null
    const imagePath = is.dev()
        ?join(__dirname, '../public/icon.ico')
        :join(app.getAppPath(), '..','icon.ico')
    // const image = nativeImage.createFromPath(path.join(__dirname, '../public/icon.ico'));
    let tray = new Tray(imagePath)
    tray.setToolTip('toolbox')
     // 托盘菜单
     const contextMenu = Menu.buildFromTemplate([{
        label: '显示',
        click: () => { win?.show() }
    },
    {
        label: '退出',
        // click: () => { win?.destroy() }
        click: () => {
            win?.webContents.send("shutdownServer","closeServer");
            miniWin?.destroy();
            win?.destroy()
            // app.quit() 
        }
    }
    ]);
    // 载入托盘菜单
    tray.setContextMenu(contextMenu);
    // 双击触发
    // tray.on('double-click', () => {
    //     // 双击通知区图标实现应用的显示或隐藏
    //     win?.isVisible() ? win.hide() : win?.show()
    //     win?.isVisible() ? win.setSkipTaskbar(false) : win?.setSkipTaskbar(true);
    // });
    tray.on('click', () => {
        win?.isVisible() ? win.hide() : win?.show()
        win?.isVisible() ? win.setSkipTaskbar(false) : win?.setSkipTaskbar(true);
    });
    win.hookWindowMessage(278,function(e){
        win?.setEnabled(false);//窗口禁用
    setTimeout(()=>{
        win?.setEnabled(true);//窗口启用
    },100);
    return true;
    })

    initIpc()
    initUpload()
    CreateMiniWin()
    Object.defineProperty(app, 'isPackaged', {
        get() {
            return true;
        }
    });
    
}


//isPackage 不好使换下面的
  //  if(process.env.NODE_ENV != 'development'){
      //  win.loadFile(path.join(__dirname, "../index.html"));
  //  }else{
        //win.loadURL(`http://${process.env['VITE_DEV_SERVER_HOSTNAME']}:${process.env['VITE_DEV_SE//RVER_PORT']}`)
   // }
//在Electron完成初始化时被触发
app.whenReady().then(createWindow)
app.setAppUserModelId('ToolBox') 

startEngine()


// if (!is.dev()){
//     app.on('will-quit',  (e) => {
//         console.log('[app] will-quit')
//         const { net } = require('electron')
//         const request = net.request('http://127.0.0.1:28888/system/shutdown')
//         request.on('response', () => {})
//         request.end()
//     })
//     process.on('exit', (code) => {
//         console.log('[app] will-quit')
//             const { net } = require('electron')
//             const request = net.request('http://127.0.0.1:28888/system/shutdown')
//             request.on('response', () => {})
//             request.end()
//     });
// }





