import Dashboard from 'views/Dashboard.vue';
import LabelManage from 'views/label/LabelManage/LabelManage.vue';
import LabelCreate from 'views/label/LabelCreate/LabelCreate.vue';
import PriorityManage from 'views/priority/PriorityManage/PriorityManage.vue';

/**
* 参数格式
    meta : {
        title: string,   // 标题
        breadcrumb: boolean,    // 是否显示在面包屑中
        upcPermission: boolean,    // 是否使用upc菜单权限
        sidebar: boolean,  // 是否在侧边栏有菜单，当子路由中有显示在侧边拦菜单中时，显示为二级菜单
        iconFont: string // 菜单图标 字体图标
        iconPath: string // 菜单图标 图片文件路径
        iconImage: string // 菜单图标 css图标名
    }

 */
export default [
  {
    path: '/label',
    component: Dashboard,
    meta: {
      title: '标签信息管理',
      breadcrumb: true,
      sidebar: true,
      iconImage: 'home'
    },
    children: [
      {
        path: '',
        component: LabelManage,
        meta: {
          breadcrumb: false
        }
      },
      {
        path: 'create',
        component: LabelCreate,
        meta: {
          title: '新建标签',
          breadcrumb: true
        }
      }
    ]
  },
  {
    path: '/priority',
    component: Dashboard,
    meta: {
      title: '优先级管理',
      breadcrumb: true,
      sidebar: true,
      iconImage: 'priority'
    },
    children: [
      {
        path: '',
        component: PriorityManage,
        meta: {
          breadcrumb: false
        }
      },
      {
        path: 'edit',
        component: PriorityManage,
        meta: {
          title: '编辑优先级',
          breadcrumb: true
        }
      }
    ]
  }
];
