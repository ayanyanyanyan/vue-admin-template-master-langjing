import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',          //重定向
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example',
    name: 'Example',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      // {
      //   path: 'classes',
      //   name: 'Classes',
      //   component: () => import('@/views/classes'),
      //   meta: { title: '班级管理', icon: 'el-icon-menu' }
      // },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/users'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      }
    ]
  }, 
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: 'System',
    meta: { title: '对外展示管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'dept',
        name: 'Dept',
        component: () => import('@/views/dept'),
        meta: { title: '产品展示', icon: 'el-icon-menu' }
      },
      {
        path: 'emp',
        name: 'Emp',
        component: () => import('@/views/emp'),
        meta: { title: '案例展示', icon: 'el-icon-user-solid' }
      },
      {                                                   /* 原班级管理 */
          path: 'news',
          name: 'News',
          component: () => import('@/views/news'),
          meta: { title: '新闻动态', icon: 'el-icon-bell' }
        },
        {                                                  
          path: 'home_image',
          name: 'Home_image',
          component: () => import('@/views/home_image'),
          meta: { title: '首页轮播图', icon: 'el-icon-view' }
        }
    ]
  },

 
  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: 'Report',
    meta: { title: '资质管理', icon: 'el-icon-s-tools' },
    children: [
      {
        path: 'aptitude_honor',
        name: 'aptitude_honor',
        component: () => import('@/views/aptitude_honor'),
        meta: { title: '资质荣誉', icon: 'el-icon-s-data' }
      },
     /*  {
        path: 'student-report',
        name: 'student-report',
        component: () => import('@/views/student-report'),
        meta: { title: '学员信息统计', icon: 'el-icon-s-data' }
      } */
    ]
  },

 
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
