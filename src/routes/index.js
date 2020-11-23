import {
    Dashboard,
    Login,
    Settings,
    NotFound,
    ArticleList,
    ArticleEdit,
    Notifications
} from '../views'
import { DashboardOutlined,SettingOutlined,UnorderedListOutlined } from '@ant-design/icons';

export const mainRoutes = [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]


export const adminRoutes = [{
    pathname:'/admin/dashboard',
    component: Dashboard,
    title: 'DASHBOARD',
    icon: <DashboardOutlined />,
    isNav:  true
},{
    pathname: '/admin/settings',
    component: Settings,
    title: 'SETTINGS',
    icon: <SettingOutlined />,
    isNav: true
},{
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    title: 'LIST',
    icon: <UnorderedListOutlined />,
    isNav: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    isNav: false
},
{
    pathname: '/admin/notifications',
    component: Notifications,
    isNav: false
}
]
