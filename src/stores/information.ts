import { Health } from "@/utils/api";
import {defineStore, storeToRefs} from "pinia";



export const useInfoStore = defineStore({
    id: "infomation",
    state: () => {
        return {
        }
    },
    getters: {
        
    },
    actions: {
        async  bilibiliAccount() {

            const res = await Health()
            if (res == 'ok') {
                return true
            }
            return false
        },
    },
})