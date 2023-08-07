import type { crontabItem, crontabList } from "@/models/crontab";
import { useCreateCron, useDeleteCron, useDisableCron, useEnableCron, useRunCron, useUpdateCron, usecorntabList } from "@/utils/api";
import { ElMessage } from "element-plus";
import {defineStore} from "pinia";



export const useCrontabStore = defineStore("crontab", {
    state: () => {
        return {
            crontabList : {} as crontabList,
            cronitem : {} as crontabItem,
        }
    },
    getters:{

    },
    actions:{
        corntabList(id:number=0,status:number=0,page:number=1,pageSize:number=10,) {
            usecorntabList(id=id,status=status,page=page,pageSize=pageSize).then(res=>{
                console.log(res)
                if (res.code == 0) {
                    this.crontabList = res.data
                }else{
                    ElMessage.error({
                        message:res.msg,
                    });
                }
            }).catch((error) => {
                console.error("Failed to get cronlist:",error)
              });
        },
        corntabSearch(id:number,status:number=0,page:number=1,pageSize:number=10,) {
            usecorntabList(id=id,status=status,page=page,pageSize=pageSize).then(res=>{
                console.log(res)
                if (res.code == 0) {
                    if(res.data.list.length==1){
                        this.cronitem = res.data.list[0]
                    }else{
                        this.cronitem = {} as crontabItem
                    }
                }else{
                    ElMessage.error({
                        message:res.msg,
                    });
                    this.cronitem = {} as crontabItem
                }
            }).catch((error) => {
                console.error("Failed to get cronlist:",error)
              });
        },
        async disableCron(id:number){
            const res =await useDisableCron(id)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.corntabList()
        },
        async enableCron(id:number){
            const res =await useEnableCron(id)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.corntabList()
        },
        async deleteCron(id:number){
            const res =await useDeleteCron(id)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.corntabList()
        },
        async updateCron(id:number,tag:string,cron:string){
            const res =await useUpdateCron(id,tag,cron)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.corntabList()
        },
        async runCron(tag:string){
            const res =await useRunCron(tag)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.corntabList()
        },
        async createCron(f:string,t:string,c:string){
            const res =await useCreateCron(f,t,c)
            if (res.code ==0){
                ElMessage.success({
                    message:res.msg,
                });
                this.corntabList()
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.corntabList()
        },
    }
})