import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/Login'
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('../views/layout/layout'),
      meta: {
        title: '整体布局！'
      },
      children: [   // 嵌套路由
        {
          path: 'index',
          component: () => import('../views/index'),
          meta: {
            title: '布局首页'
          }
        },
        {
          path: 'userList',
          component: () => import('../views/user/userList'),
          meta: {
            title: '用户列表'
          }
        },
        {
          path: 'categoryList',
          component: () => import('../views/category/category-list'),
          meta: {
            title: '分类列表'
          }
        },
        {
          path: 'addCategory',
          component: () => import('../views/category/addCategory'),
          meta: {
            title: '添加分类'
          }
        },
        {
          path: 'editCategory',
          name: 'editCategory',
          component: () => import('../views/category/editCategory'),
          meta: {
            title: '修改编辑分类'
          }
        },
        {
          path: 'personCenter',
          component: () => import('../views/user/personCenter'),
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'addUser',
          component: () => import('../views/user/addUser'),
          meta: {
            title: '添加用户'
          }
        },
        {
          path: 'bookList',
          name: 'bookList',
          component: () => import('../views/books/bookList'),
          meta: {
            title: '分类图书'
          }
        },
        {
          path: 'addBook',
          name: 'addBook',
          component: () => import('../views/books/addBook'),
          meta: {
            title: '添加图书'
          }
        },
        {
          path: 'swiperList',
          name: 'swiperList',
          component: () => import('../views/swipers/swiperList'),
          meta: {
            title: '轮播图列表'
          }
        },
        {
          path: 'addSwiper',
          name: 'addSwiper',
          component: () => import('../views/swipers/addSwiper'),
          meta: {
            title: '添加轮播图'
          }
        },
        {
          path: 'editSwiper',
          name: 'editSwiper',
          component: () => import('../views/swipers/editSwiper'),
          meta: {
            title: '编辑轮播图'
          }
        },
        {
          path: 'bookEdit',
          name: 'bookEdit',
          component: () => import('../views/books/bookEdit'),
          meta: {
            title: '图书编辑'
          }
        }

      ]
    }
  ]
})
// 改变路由时，改变导航的title， beforeEach导航守卫
router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.title){
    document.title = to.meta.title
  }
  next()
})

export default router
