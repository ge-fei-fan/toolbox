import http from "@/utils/http";
import type { biliAccount, biliPullQr, biliQr, collectUserRes, collectVideoRes, collectVodeo, videoItem, videoList } from "@/models/bilibili";
import type {  SysConfig,Weather } from "@/models/config";
import type { crontabList } from "@/models/crontab";



export async function usebilibiliAccount() {
    return await http.get<{
        code: number,
        data: biliAccount
        msg:string
    }>("bilibili/account")
}
export async function useBiliniliQr() {
    return await http.get<{
        code: number,
        data: biliQr
        msg:string
    }>("/bilibili/qrcode/generate")
}
export   function  usePullQr(key:string) {
    return   http.get<{
        code: number,
        data: biliPullQr
        msg:string
    }>("/bilibili/qrcode/poll",{qrcodekey:key})
}


export   function useVideoList(status:number=-1,page:number=1,pageSize:number=100)  {
    return   http.get<{
        code: number,
        data: videoList,
        msg:string
    }>("/bilibili/video",{page:page,pageSize:pageSize,status:status})
}
export async function useReDownload(cid: number) {
    return await http.get<{
        code: number,
        msg:string
    }>("/bilibili/redownload", {cid: cid})
   
}
export async function useDeleteItem(id: number) {
    return await http.post<{
        code: number,
        msg:string
    }>("/bilibili/delete", {id: id})
   
}
export async function useDownloadVideo(u: string) {
    return await http.get<{
        code: number,
        msg:string
    }>("/bilibili/download", {url: u})
   
}


export   function useCollectVideoList(page:number=1,pageSize:number=10)  {
    return   http.get<{
        code: number,
        data: collectVideoRes,
        msg:string
    }>("/bilibili/collect/video",{page:page,pageSize:pageSize,})
}
export  async function useVideoDetail(id:number)  {
    return  await http.get<{
        code: number,
        data: videoItem,
        msg:string
    }>("/bilibili/videodetail",{ID:id})
}

export   function useAddCollectUser(mid:number)  {
    return   http.post2<{
        code: number,
        msg:string
    }>("/bilibili/collect/add",{mid:mid})
}
export   function useCollectUserList(page:number=1,pageSize:number=10)  {
    return   http.get<{
        code: number,
        data:collectUserRes,
        msg:string
    }>("/bilibili/collect/list",{page:page,pageSize:pageSize,})
}
export  function usechangeCollectUser(id:number)  {
    return   http.get<{
        code: number,
        msg:string
    }>("/bilibili/collect/status",{ID:id})
}





export async function useGetConfig() {
    return await http.get<{ 
        code: number,
        msg:string,
        data: SysConfig 
    }>('/system/config/list')
    
}
export async function useUpdateConfig(conf:SysConfig) {
    return await http.post2<{ 
        code: number,
        msg:string,
    }>('/system/config/update',conf)
    
}
export   function usecorntabList(id:number =0,status:number,page:number=1,pageSize:number=10)  {
    return   http.get<{
        code: number,
        data: crontabList,
        msg:string
    }>("/system/crontab/list",{ID:id,page:page,pageSize:pageSize,status:status})
}
export   async function useDisableCron(id:number){
    return await http.post2<{
        code: number,
        msg:string
    }>("/system/crontab/disable", {id: id})
}
export   async function useEnableCron(id:number){
    return await http.post2<{
        code: number,
        msg:string
    }>("/system/crontab/enable", {id: id})
}
export   async function useDeleteCron(id:number){
    return await http.post2<{
        code: number,
        msg:string
    }>("/system/crontab/delete", {id: id})
}
export   async function useUpdateCron(id:number,tag:string,cron:string){
    return await http.post2<{
        code: number,
        msg:string
    }>("/system/crontab/update", {id:id,tag:tag,cron:cron})
}
export   async function useRunCron(tag:string){
    return await http.post2<{
        code: number,
        msg:string
    }>("/system/crontab/run", {tag: tag})
}
export   async function useCreateCron(funcname:string,tag:string,cron:string){
    return await http.post2<{
        code: number,
        msg:string
    }>("/system/crontab/add", {func: funcname,tag:tag,cron:cron})
}



export async function shutdownServer() {
    return await http.get<{ 
        // msg:string,
    }>('/system/shutdown')   
}
export async function Health() {
    return await http.get<{ 
        // msg:string,
    }>('/health')   
}
interface Version{
    "version":string
}
export async function useVersion() {
    return await http.get<{ 
        code:number,
        msg:string,
        data:Version
    }>('/system/version')   
}
//获取天气
export async function Weather() {
    return await http.get<{ 
        code:number,
        msg:string,
        data:Weather
    }>('/system/amap/weather')   
}
