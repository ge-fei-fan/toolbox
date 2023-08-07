import { spawn } from "child_process"
import { existsSync } from "fs"
import { join } from "path"
import is from 'electron-is'
import { app } from "electron"




export  function startEngine() {
    const binPath = is.dev()
        ?join(app.getAppPath(), `/engine/toolbox-server.exe`)
        :join(app.getAppPath(), '..',`/toolbox-server.exe`)
    const binIsExist = existsSync(binPath)
    if (!binIsExist) {
      throw new Error(binPath)
    }
    if(!is.dev()){
        const server = spawn(binPath,  {
            windowsHide: false,
            stdio: is.dev() ? 'pipe' : 'ignore'
        })
        
        
        if (is.dev()) {
            server.stdout?.on('data', function (data) {
              console.log('engine stdout===>', data.toString())
            })
      
            server.stderr?.on('data', function (data) {
                console.log('engine stderr===>', data.toString())
            })
        }

    }
    
    
};



