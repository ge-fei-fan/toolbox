import type { TabsPaneContext } from "element-plus";
import {ref, watch} from "vue";
import {useRouter, useRoute} from "vue-router";
import { useBiliAccountStore } from "@/stores/bilibili";

const AccountStore =  useBiliAccountStore()
interface IMenu {
    label: string,
    name: string,
}
export function useBiliMenu() {
    const menus: IMenu[] = [
        {
            label: '正在下载',
            name: 'Downloading',
        },
        {
            label: '下载完成',
            name: 'Downloaded',
        }
    ];

    const router = useRouter();
    const route = useRoute();

    // const currentMenu = ref(route.name)
    const currentMenu = ref("Downloading")

    // watch(() => route.name, m => {
    //     currentMenu.value = m
    // })


    const onTabClick = (tab: TabsPaneContext, event: Event) => {
        if(tab.props.name == "Downloading"){
            if(currentMenu.value !=tab.props.name){
                // AccountStore.closeTimer("video")
                AccountStore.videlist(1)
                AccountStore.getVideoList(1)
                console.log("Downloading")
            }
        }else if(tab.props.name == "Downloaded"){
            if(currentMenu.value !=tab.props.name){
                AccountStore.closeTimer("video")
                AccountStore.videlist(0)
                // AccountStore.getVideoList(0)
                console.log("Downloaded")
            }
            
        }
    }
    
    const reFresh = ()=>{
        if(currentMenu.value == "Downloaded"){
            AccountStore.videlist(0)
        }
    }
    return {
        menus,
        currentMenu,
        onTabClick,
        reFresh,
    }
}