import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../components/Layout.vue'),
        children: [
            {
                path: 'about',
                name: 'About',
                component: () => import('../pages/About.vue')
            },
            {
                path: 'user',
                name: 'User',
                component: () => import('../pages/User.vue')
            },
            // 默认重定向到 about 页面
            {
                path: '',
                redirect: 'about'
            }
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../pages/404.vue')
    },
    {
        path: '/no-permission',
        name: 'NoPermission',
        component: () => import('../pages/NoPermission.vue')
    },
    // 重定向到 404 页面
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const isLogin = token ? true : false
    console.log(to, from, token, isLogin)
    if (isLogin) {
        console.log('login');
        next()
    } else {
        console.log('no login');
        localStorage.setItem('token', '123')
        // 跳转到百度
        window.location.href = 'http://www.baidu.com'
    }
})

export default router