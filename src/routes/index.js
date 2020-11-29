import {
    Dashboard,
    Login,
    Settings,
    NotFound,
    ArticleList,
    ArticleEdit,
    Notifications,
    NoAuth,
    Profile
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
    isNav:  true,
    roles: ['001','002','003']
},{
    pathname: '/admin/settings',
    component: Settings,
    title: 'SETTINGS',
    icon: <SettingOutlined />,
    isNav: true,
    roles: ['001']
},{
    pathname: '/admin/article',
    component: ArticleList,
    exact: true,
    title: 'LIST',
    icon: <UnorderedListOutlined />,
    isNav: true,
    roles: ['001','002']
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    isNav: false,
    roles: ['001']
},
{
    pathname: '/admin/notifications',
    component: Notifications,
    isNav: false,
    roles: ['001','002','003']
},
{
    pathname: '/admin/noauth',
    component: NoAuth,
    isNav: false
},
{
    pathname: '/admin/profile',
    component: Profile,
    isNav: false,
    roles: ['001','002','003']
}
]
