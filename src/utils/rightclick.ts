// renderer.ts

import { getCurrentWindow } from "@electron/remote";

export default class RightClickManager {
    private static instance: RightClickManager;
    private isListening: boolean;
    private menu: Electron.Menu;

  
    private constructor(menu: Electron.Menu) {
        this.isListening = false;
        this.menu = menu;
      }
  
    public static getInstance(menu: Electron.Menu): RightClickManager {
      if (!RightClickManager.instance) {
        RightClickManager.instance = new RightClickManager(menu);
        
      }
      return RightClickManager.instance;
    }
  
    public startListening(): void {
      if (!this.isListening) {
        window.addEventListener('contextmenu', this.handleRightClick);
        this.isListening = true;
      }
    }
  
    public stopListening(): void {
      if (this.isListening) {
        window.removeEventListener('contextmenu', this.handleRightClick);
        this.isListening = false;
      }
    }
  
    private handleRightClick= (event: Event): void => {
      // 阻止默认行为
      event.preventDefault();
      // 弹出上下文菜单
      this.menu.popup({
        // 获取网页所属的窗口
        window: getCurrentWindow()
      });
    }
    
  }
  
  