import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import {Pages} from "@/router/pages";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: Pages.home,
            component: () => import('@/views/Root.vue'),
            redirect: {name: Pages.bilibili},
            children: [
                {
                    path: 'bilibili',
                    name: 'bilibili',
                    component: () => import("@/views/bilibili/Bilibili.vue"),
                    // redirect: {name: 'bilibili'},
                    meta: {
                        menu: 'bilibili',
                        keepAlive: true,
                    },
                },
                {
                    path:'crontab',
                    name:'crontab',
                    component: () => import("@/views/crontab/Crontab.vue"),
                    meta: {
                        menu: 'crontab',
                        keepAlive: true,
                    },
                }, 
                {
                    path:'conifg',
                    name:'conifg',
                    component: () => import("@/views/config/Config.vue"),
                    meta: {
                        menu: 'conifg',
                        keepAlive: true,
                    },
                },
                {
                    path:'infomation',
                    name:'infomation',
                    component: () => import("@/views/infomation/Infomation.vue"),
                    meta: {
                        menu: 'infomation',
                        keepAlive: true,
                    },
                },
                {
                    path:'tanzhen',
                    name:'tanzhen',
                    component: () => import("@/views/infomation/TanZhen.vue"),
                    meta: {
                        menu: 'tanzhen',
                        keepAlive: true,
                    },
                },
            ],
        },
        {
            path: '/mini',
            name: 'mini',
            component: () => import('@/views/Mini.vue'),
            children:[
                {
                path: 'clockmini',
                name: 'clockmini',
                component: () => import("@/views/miniWin/Clockmini.vue"),
                meta: {
                    menu: 'clockmini',
                    keepAlive: true,
                    },
                }   
            ],
        }
    ]
})

export default router
