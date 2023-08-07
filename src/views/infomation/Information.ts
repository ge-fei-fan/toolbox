import {ref, watch} from "vue";
import { useInfoStore } from "@/stores/information";

const InfoStore =  useInfoStore()

export function useInformation() {
    const serverStatus = ref("停用")
    const checkServer =async ()=>{
        try{
            const res = await InfoStore.bilibiliAccount().catch()
            if(res){
                serverStatus.value = "启用"
            }else{
                serverStatus.value = "停用"
            }
        }catch{
            serverStatus.value = "停用"
        }
        
    }
    return {
        serverStatus,
        checkServer,
    }
}