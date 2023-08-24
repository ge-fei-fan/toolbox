import { Health, useVersion } from "@/utils/api";
import {defineStore, storeToRefs} from "pinia";



export const useInfoStore = defineStore({
    id: "infomation",
    state: () => {
        return {
            version:""
        }
    },
    getters: {
        
    },
    actions: {
        async  systemHealth() {

            const res = await Health()
            if (res == 'ok') {
                return true
            }
            return false
        },
        async  systemVersion() {
            const res = await useVersion()
            if (res.code == 0) {
                this.version= res.data.version
            }else{
                this.version= "错误"
            }
        }
    },
})