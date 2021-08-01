export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',// 登录
        name: 'Login',
        component: () => import('../src/login.vue')
    },
    {
        path: '/home',
        meta: {
            requireAuth: true, // 判断是否需要登录
        },
        component: () => import('../src/app.vue'),
        children: [
            {
                path: '/',
                component: () => import('../src/views/home/home.vue'),
                name: 'show'
            },
            {
                path: 'now',
                component: () => import('../src/views/news/news.vue'),
                name: 'now'
            },
            {
                path: 'info',
                component: () => import('../src/views/info/info.vue'),
                name: 'info'
            },
            {
                path: 'create',
                component: () => import('../src/views/newsCreate/newsCreate.vue'),
                name: 'create'
            },
            {
                path: 'section',
                component: () => import('../src/views/newsSection/section.vue'),
                name: 'section'
            }
        ]
    }
]