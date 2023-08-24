import {ref, watch} from "vue";
import {Server,List,Video,Planet, Music, VideoOne, Fm, Like, Info, DownloadThree, PlayTwo,SettingConfig} from '@icon-park/vue-next'
import {useRoute, useRouter} from "vue-router";

interface IMenu {
    name: string;
    key: string;
    icon: any;
    theme: 'outline' | 'filled' | 'two-tone' | 'multi-color',
}

interface IMenus {
    name: string,
    menus: IMenu[],
}

export function useMenu() {
    // const settingmenu: IMenus = 
    // {
    //     name: "",
    //     menus: [
    //         {
    //             name: "配置中心",
    //             key: "conifg",
    //             icon: SettingConfig,
    //             theme: 'outline',
    //         },
    //         {
    //             name: "详情",
    //             key: "infomation",
    //             icon: Info,
    //             theme: 'outline',
    //         },
    //     ]
    // };
    const settingmenu: IMenus[] = [
        {
            name: "",
            menus: [
                {
                    name: "配置中心",
                    key: "conifg",
                    icon: SettingConfig,
                    theme: 'outline',
                },
                {
                    name: "详情",
                    key: "infomation",
                    icon: Info,
                    theme: 'outline',
                },
            ]
        },
    ];
    const menus: IMenus[] = [
        {
            name: "",
            menus: [
                {
                    name: "B站管理中心",
                    key: "bilibili",
                    icon: Video,
                    theme: 'outline',
                },
                {
                    name: "定时任务中心",
                    key: "crontab",
                    icon: List,
                    theme: 'outline',
                },
                // {
                //     name: "哪吒探针",
                //     key: "tanzhen",
                //     icon: Server,
                //     theme: 'outline',
                // },
                
            ]
        },
    ];

    const route = useRoute();

    const currentKey = ref(route.meta.menu);

    const router = useRouter();

    watch(
        () => route.meta.menu,
        (menu) => {
            currentKey.value = menu;
        },
    );


    const click = async (menu: IMenu) => {
        const r = router.resolve({ name: menu.key });
        console.log(r.href)
        await router.push({name: menu.key, replace: true,})
    };

    return {
        settingmenu,
        menus,
        click,
        currentKey,
    };
}
