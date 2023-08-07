export interface SysConfig {
    zap:{
        level:string
        director:string
    }
    system:{
        addr:number
    }
    bilibili:{
        collect:boolean
        "auto-download":boolean
        "download-path":string
    }
}

export interface Weather {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    province: string,
    city: string,
    adcode: string,
    weather: string,
    temperature: string,
    winddirection: string,
    windpower: string,
    humidity: string,
    reporttime: string,
    temperature_float: string,
    humidity_float: string
}
