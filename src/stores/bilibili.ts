import type {  biliAccount,collectUser,collectVodeo,videoItem } from "@/models/bilibili";
import {defineStore} from "pinia";
import{useBiliniliQr, usePullQr, useVideoList, usebilibiliAccount,useDownloadVideo, useCollectVideoList, useAddCollectUser, useCollectUserList, usechangeCollectUser} from "@/utils/api"
import { ElMessage } from 'element-plus'


export const useBiliAccountStore = defineStore("bilibili", {
    state: () => {
        return {
            showLogin: false,
            profile: {} as biliAccount,
            qrUrl:"" ,
            qrcode_key:"",
            pullQrTimer:null as any,
            videoTimer:null as any,
            videoList: [] as any,
            videoUrl:'',
            collectVideos: [] as collectVodeo[],
            collectVideosTotal:0,
            collectUserInput:"",

            collectUsers: [] as collectUser[],
        }
    },
    getters: {
        isLogin: state => {
            return state.profile?.code == 0
        }
    },
    actions: {
        async  bilibiliAccount() {
            const res = await usebilibiliAccount()
            // console.log(res)
            if (res.code == 0) {
                this.profile = res.data
                this.showLogin = false
            }
        },
        async getQr() {
            const res = await useBiliniliQr()
            if (res.code == 0) {
                this.qrUrl = res.data.url
                this.qrcode_key = res.data.qrcode_key
            }
        },
        async closeTimer(key:string) {
            if (key=="qr"){
                if (this.pullQrTimer){
                    clearInterval(this.pullQrTimer);
                    // console.log("qr timer close")
                }
            }else if(key=="video"){
                if (this.videoTimer){
                    clearInterval(this.videoTimer);
                    // console.log("video timer close")
                }
            }
            
        },
        pullQr() {
            //每5s刷新数据
            this.pullQrTimer = setInterval(() => {
                usePullQr(this.qrcode_key).then(res=>{
                    if (res.code == 0) {
                        if (res.data.code==0){
                            ElMessage.success({
                                message:"登录成功",
                            });
                            this.bilibiliAccount()
                            this.showLogin = false
                        }
                    }
                }).catch((error) => {
                    console.error("Failed to pull QR code:",error)
                  });
            }, 1000);
        },
        getVideoList(status:number){
            this.videoTimer = setInterval((status:number) => {
                this.videlist(status)
            },1000,status)
            
        },
        videlist(status:number){
            useVideoList(status).then(res=>{
                if (res.code == 0) {
                    this.videoList =[];
                    // this.videoList = res.data.list
                    
                    for (let item of res.data.list) {
                        const date = new Date(item.UpdatedAt); 
                        const formattedDate = date.toLocaleString([], {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        }).replace(/\//g, "-");
                        // let s ="";
                        // switch (item.status){
                        //     case 0:
                        //         s = "下载完成";
                        //         break;
                        //     case 1:
                        //         s = "正在下载视频";
                        //         break;
                        //     case 2:
                        //         s ="正在下载音频";
                        //         break;
                        //     case 3:
                        //         s="正在合并音视频";
                        //         break;
                        //     case -1:
                        //         s = item.result;
                        //         break;
                        // };
                        this.videoList.push({
                            id:item.ID,
                            title:item.title,
                            quality:item.quality,
                            updatedAt:formattedDate,
                            status:item.status,
                            progress:item.progress,
                            cid:item.cid,
                            path:item.savePath
                        })
                    };
                    // console.log(this.videoList)
                }
            }).catch((error) => {
                console.error("Failed to get videolist:",error)
              });
        },
        async downloadVideo(){
            const res = await useDownloadVideo(this.videoUrl)
            if (res.code == 0) {
                ElMessage.success({
                    message:res.msg,
                });
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            // console.log("下载视频",this.videoUrl);
            this.videoUrl="";
        },
        //
        async collectVideo(p:number) {
            
            const res = await useCollectVideoList(p)
            if (res.code == 0) {
                this.collectVideosTotal = Math.ceil(res.data.total/res.data.pageSize)
                console.log(this.collectVideosTotal)
                this.collectVideos = [...this.collectVideos, ...res.data.list];
            }
        },

        async addCollectUser(){
            const res = await useAddCollectUser(Number(this.collectUserInput))
            if (res.code == 0) {
                ElMessage.success({
                    message:res.msg,
                });  
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
            this.collectUserInput = "";
        },

        async CollectUser(page:number=1,pageSize:number=10){
            const res = await useCollectUserList(page,pageSize)
            if (res.code == 0) {
                this.collectUsers = res.data.list
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
        },
        async changeCollectUser(id:number) {
            
            const res = await usechangeCollectUser(id)
            if (res.code == 0) {
                ElMessage.success({
                    message:res.msg,
                }); 
                this.CollectUser()
            }else{
                ElMessage.error({
                    message:res.msg,
                });
            }
        },

    }
})
