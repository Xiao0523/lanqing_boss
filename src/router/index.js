import Vue from 'vue'
import Router from 'vue-router'

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

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/business',
    name: 'Business',
    component: () => import('@/views/business/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login'
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
export const asyncRoutes = [
  {
    path: '/home',
    component: Layout,
    alwaysShow: false,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '机构中心', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/subbranch',
    redirect: '/subbranch/subbranchList',
    component: Layout,
    alwaysShow: true,
    meta: { title: '分店管理', icon: 'list' },
    children: [
      {
        path: 'subbranchList',
        name: 'Subbranch',
        alwaysShow: false,
        component: () => import('@/views/subbranch/index'),
        meta: { title: '分店列表' }
      },
      {
        path: 'detail',
        name: 'SubbranchDetail',
        component: () => import('@/views/subbranch/detail/index'),
        meta: { title: '店铺详情' },
        hidden: true
      },
      {
        path: 'addSubbranch',
        name: 'AddSubbranch',
        component: () => import('@/views/subbranch/add/index'),
        meta: { title: '创建分店' },
        hidden: true
      }
    ]
  },
  {
    path: '/category',
    redirect: '/category/subbranchList',
    component: Layout,
    alwaysShow: false,
    children: [
      {
        path: 'categoryList',
        name: 'Category',
        component: () => import('@/views/category/index'),
        meta: { title: '类目管理', icon: 'list' }
      }
    ]
  },
  {
    path: '/shop',
    component: Layout,
    alwaysShow: true,
    meta: { title: '店铺中心', icon: 'education' },
    children: [{
      path: '',
      name: 'Shop',
      component: () => import('@/views/shop/index/index'),
      meta: { title: '店铺中心' }
    },
    {
      path: 'edit',
      name: 'Shop-edit',
      component: () =>
      import('@/views/shop/edit/index'),
      hidden: true,
      meta: { title: '店铺编辑' }
    }]
  },
  {
    path: '/academic',
    component: Layout,
    redirect: '/academic/course',
    alwaysShow: true,
    name: 'Academic',
    meta: { title: '教务中心', icon: 'education' },
    children: [
      {
        path: 'course',
        component: () => import('@/views/academic/course/index'),
        children: [
          {
            path: '',
            name: 'Course',
            component: () => import('@/views/academic/course/index/index'),
            meta: { title: '课程管理' }
          },
          {
            path: 'detail',
            name: 'Course-detail',
            component: () =>
            import('@/views/academic/course/course-detail/index'),
            hidden: true,
            meta: { title: '课程详情' }
          },
          {
            path: 'edit',
            name: 'Course-edit',
            component: () =>
            import('@/views/academic/course/course-edit/index'),
            hidden: true,
            meta: { title: '课程编辑' }
          }
        ]
      },
      {
        path: 'teacher',
        component: () => import('@/views/academic/teacher/index'),
        children: [
          {
            path: '',
            name: 'Teacher',
            component: () => import('@/views/academic/teacher/index/index'),
            meta: { title: '讲师管理' }
          },
          {
            path: 'detail',
            name: 'Teacher-detail',
            component: () =>
            import('@/views/academic/teacher/teacher-detail/index'),
            hidden: true,
            meta: { title: '讲师详情' }
          },
          {
            path: 'edit',
            name: 'Teacher-edit',
            component: () =>
            import('@/views/academic/teacher/teacher-edit/index'),
            hidden: true,
            meta: { title: '讲师编辑' }
          }
        ]
      },
      {
        path: 'student',
        component: () => import('@/views/academic/student/index'),
        children: [
          {
            path: '',
            name: 'Student',
            component: () => import('@/views/academic/student/index/index'),
            meta: { title: '学员管理' }
          },
          {
            path: 'detail',
            name: 'Student-detail',
            component: () =>
              import('@/views/academic/student/student-detail/index'),
            hidden: true,
            meta: { title: '学员详情' }
          }
        ]
      }
    ]
  },
  {
    path: '/finance',
    component: Layout,
    redirect: '/finance/course-order',
    alwaysShow: true,
    name: 'Finance',
    meta: { title: '财务中心', icon: 'money' },
    children: [
      {
        path: 'course-order',
        name: 'Course-order',
        component: () => import('@/views/finance/course-order/index'),
        meta: { title: '订单管理' }
      },
      {
        path: 'scholarship',
        name: 'ScholaSrship',
        component: () => import('@/views/finance/scholarship/index'),
        meta: { title: '奖学金币' }
      },
      {
        path: 'property',
        name: 'Property',
        component: () => import('@/views/finance/property/index'),
        meta: { title: '资产管理' }
      }
    ]
  },
  /* {
    path: '/data',
    component: Layout,
    redirect: '/data/academic-data',
    alwaysShow: true,
    name: 'Data',
    meta: { title: '数据中心', icon: 'zip' },
    children: [
      {
        path: 'academic-data',
        name: 'Academic-data',
        component: () => import('@/views/data/academic-data/index'),
        meta: { title: '教务数据' }
      },
      {
        path: 'finance-data',
        name: 'Finance-data',
        component: () => import('@/views/data/finance-data/index'),
        meta: { title: '财务数据' }
      }
    ]
  }, */
  /* {
    path: '/show',
    component: Layout,
    redirect: '/show/competition',
    alwaysShow: true,
    name: 'Show',
    meta: { title: '蓝青秀', icon: 'skill' },
    children: [
      {
        path: 'competition',
        component: () => import('@/views/show/competition/index'),
        children: [
          {
            path: '',
            name: 'Competition',
            component: () => import('@/views/show/competition/index/index'),
            meta: { title: '才艺比赛' }
          },
          {
            path: 'detail',
            name: 'Competition-detail',
            component: () =>
              import('@/views/show/competition/competition-detail/index'),
            hidden: true,
            meta: { title: '比赛详情' }
          }
        ]
      },
      {
        path: 'join',
        name: 'Join',
        component: () => import('@/views/show/join/index'),
        meta: { title: '邀请加盟' }
      }
    ]
  }, */
  /* {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  }, */

  /*  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }, */

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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
