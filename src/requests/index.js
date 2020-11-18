import axios from 'axios'
import { message } from 'antd'
const isDev= process.env.NODE_ENV  === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/270644/api/' : ''
})

service.interceptors.request.use(
    config => {config.data = Object.assign({},config.data,{
        // authToken: window.localStorage.getItem('authToken')
        authToken:'thisisatoken'
            }
        )
        return config
    }
)

service.interceptors.response.use(
    resp =>{
        if (resp.data.code === 200){
            return resp.data.data
        }else{
            //global error message
            message.error('error')
        }
    }
)
// get the article list
export const getArticles = (offset=0,limited=10) => {

    return service.post('vl/articlelist',{
        offset,limited
    })
}

// delete article through article id
export const deleteArticleByID = id => service.post(`vl/articleDelete/${id}`)