export interface crontabList {
    list:crontabItem[];
    total:number;
    page: number;
    pageSize: number
    
}

export interface crontabItem {
    
    ID: number,
    CreatedAt: string;
    UpdatedAt: string;
    func: string;
    tag: string;
    status: number;
    nextTime: string;
    cron: string;
    isRunning: boolean
    
}

