import Vue from 'vue'
import Router from 'vue-router'
import { getLocal } from '@/utils/local'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const whiteList = ['/login', '/business']

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  }

  /*  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  }, */

  /* {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  } */
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const adminRoutes = [
  {
    path: '/',
    component: Layout,
    alwaysShow: false,
    redirect: '/home',
    name: 'Home',
    meta: { title: '机构中心', icon: 'dashboard', roles: ['businessPassed', 'businessUnPassed'] },
    children: [
      {
        path: '/home',
        name: 'HomeContent',
        component: () => import('@/views/home/index'),
        meta: { title: '机构中心', roles: ['businessPassed', 'businessUnPassed'] }
      }
    ]
  },
  {
    path: '/business',
    name: 'Business',
    component: () => import('@/views/business/index'),
    hidden: true,
    meta: { roles: ['businessPassed', 'businessUnPassed'] }
  },
  {
    path: '/subbranch',
    redirect: '/subbranch/subbranchList',
    component: Layout,
    alwaysShow: true,
    name: 'Subbranch',
    meta: { title: '分店管理', icon: 'component', roles: ['businessPassed', 'businessUnPassed'] },
    children: [
      {
        path: 'subbranchList',
        name: 'SubbranchList',
        alwaysShow: false,
        component: () => import('@/views/subbranch/index'),
        meta: { title: '分店列表', roles: ['businessPassed', 'businessUnPassed'] }
      },
      {
        path: 'editSubbranch',
        name: 'EditSubbranch',
        component: () => import('@/views/subbranch/add/index'),
        meta: { title: '编辑店铺', roles: ['businessPassed', 'businessUnPassed'] },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    redirect: '/category/subbranchList',
    component: Layout,
    alwaysShow: false,
    name: 'Category',
    meta: { title: '类目管理', icon: 'list', roles: ['businessPassed', 'businessUnPassed'] },
    children: [
      {
        path: 'categoryList',
        name: 'CategoryList',
        component: () => import('@/views/category/index'),
        meta: { title: '类目管理', roles: ['businessPassed', 'businessUnPassed'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const storeRoutes = [
  {
    path: '/',
    component: Layout,
    alwaysShow: false,
    redirect: '/shop',
    name: 'Shop',
    meta: { title: '店铺中心', icon: 'dashboard', roles: ['store'] },
    children: [{
      path: '/shop',
      name: 'ShopContent',
      component: () => import('@/views/shop/index'),
      meta: { title: '店铺中心', roles: ['store'] }
    }]
  },
  {
    path: '/academic',
    component: Layout,
    redirect: '/academic/course',
    alwaysShow: true,
    name: 'Academic',
    meta: { title: '教务中心', icon: 'education', roles: ['store'] },
    children: [
      {
        path: 'course',
        name: 'Course',
        component: () => import('@/views/academic/course/index/index'),
        meta: { title: '课程管理', roles: ['store'] }
      },
      {
        path: 'courseDetail',
        name: 'Course-detail',
        component: () =>
        import('@/views/academic/course/course-detail/index'),
        hidden: true,
        meta: { title: '课程详情', roles: ['store'] }
      },
      {
        path: 'courseEdit',
        name: 'Course-edit',
        component: () =>
        import('@/views/academic/course/course-edit/index'),
        hidden: true,
        meta: { title: '课程编辑', roles: ['store'] }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/academic/teacher/index/index'),
        meta: { title: '讲师管理', roles: ['store'] }
      },
      {
        path: 'teacherDetail',
        name: 'Teacher-detail',
        component: () =>
        import('@/views/academic/teacher/teacher-detail/index'),
        hidden: true,
        meta: { title: '讲师详情', roles: ['store'] }
      },
      {
        path: 'teacherEdit',
        name: 'Teacher-edit',
        component: () =>
        import('@/views/academic/teacher/teacher-edit/index'),
        hidden: true,
        meta: { title: '讲师编辑', roles: ['store'] }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/academic/student/index/index'),
        meta: { title: '学员管理', roles: ['store'] }
      },
      {
        path: 'studentDetail',
        name: 'Student-detail',
        component: () =>
          import('@/views/academic/student/student-detail/index'),
        hidden: true,
        meta: { title: '学员详情', roles: ['store'] }
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/course-order',
    alwaysShow: true,
    name: 'Finance',
    meta: { title: '财务中心', icon: 'money', roles: ['store'] },
    children: [
      {
        path: 'course-order',
        name: 'Course-order',
        component: () => import('@/views/finance/course-order/index'),
        meta: { title: '订单管理', roles: ['store'] }
      },
      {
        path: 'scholarship',
        name: 'ScholaSrship',
        component: () => import('@/views/finance/scholarship/index'),
        meta: { title: '奖学金币', roles: ['store'] }
      },
      {
        path: 'property',
        name: 'Property',
        component: () => import('@/views/finance/property/index'),
        meta: { title: '资产管理', roles: ['store'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

router.beforeEach((to, from, next) => {
  const role = getLocal('temp_Roles')
  if (!(whiteList.includes(to.path)) && role && role[0] !== 'store') {
    const status = getLocal('examineStatus')
    if (status && status !== 1) {
      next({ path: '/business' })
      return
    }
  }
  next()
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
