import { Loading } from '../components'
import Loadable from 'react-loadable'

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})

const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
})

const ArticleList = Loadable({
    loader: () => import('./Article'),
    loading: Loading
})

const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading
})


const Notifications = Loadable({
    loader: () => import('./Notifications'),
    loading: Loading
})
export {
    Dashboard,
    ArticleList,
    ArticleEdit,
    Settings,
    Login,
    NotFound,
    Notifications
}