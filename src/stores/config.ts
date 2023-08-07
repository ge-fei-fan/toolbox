import { useGetConfig, useUpdateConfig } from "@/utils/api";
import { ElMessage } from "element-plus";
import {defineStore, storeToRefs} from "pinia";
import type {  SysConfig } from "@/models/config";
import {clipboardTimer, startClipboard, stopClipboard } from "@/utils/clipboard";



export const useConfigStore = defineStore({
    id: "config",
    state: () => ({
        autodownload:false,
        conf:{} as SysConfig
    }),
    getters: {
     
    },
    actions: {
        async  updateConfig() {
            const res= await useUpdateConfig(this.conf)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
                const {data} = await useGetConfig()
                if (data.bilibili["auto-download"]){
                        await startClipboard()
                }else{
                        await stopClipboard()
                }
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
        }
    },
})