export interface biliAccount {
    code:number;
    message:string;
    data:accountInfo
}
interface accountInfo {
    mid:number;
    uname:string;
    userid:string;
    rank:string
}

export interface biliQr{
    url:string;
    qrcode_key:string
}

export interface biliPullQr{
    refresh_token:string;
    code:number;
    message:string
}

export interface videoList{
    total:number;
    page:number;
    pageSize:number;
    list:videoItem[];
}

export interface videoItem {
    ID:number;
    UpdatedAt:string;
    title:string;
    result:string;
    status:number;
    quality:string;
    completedBytes:number;
    totalBytes:number;
    progress:number;
    cid:number;
    savePath:string;
    owner:string;
}

export interface cronChange {
    type:string;
    id:number
}

export interface collectVideoRes {
    total:number;
    page:number;
    pageSize:number;
    list:collectVodeo[]
}
//采集视频响应结构体
export interface collectVodeo {
    ID:number
    CreatedAt:string
    UpdatedAt:string
    BilibiliCollect:collectUser
    aid:number
    author:string
    bvid:string
    comment:number
    created:number
    description:string
    length:string
    mid:string
    pic:string
    title:string
    video_review:number
}
export interface collectUserRes {
    total:number;
    page:number;
    pageSize:number;
    list:collectUser[]
}
//采集用户响应结构体
export interface collectUser {
    ID: number,
    CreatedAt:string
    UpdatedAt:string
    mid: number,
    name: string,
    sex: string,
    face: string,
    sign:string,
    silence: number,
    is_collect: boolean,
}
