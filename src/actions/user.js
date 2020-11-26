import actionType from './actionTypes.js'
import { loginRequest } from '../requests'


const startLogin = () =>{
    return ({
        type:actionType.START_LOGIN
    })
}
const loginSuccess = userInfo =>{
    return ({
        type:actionType.LOGIN_SUCCESS,
        payload : {
            userInfo
        }
    })
}
const loginFailed = () =>{
    window.localStorage.removeItem('authToken')
    window.sessionStorage.removeItem('authToken')
    return ({
        type:actionType.LOGIN_FAILED
    })
}

export const login = userInfo => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo).then(
            resp =>{
                if (resp.data.code === 200 ){
                    if (userInfo.remember === true){
                        window.localStorage.setItem('authToken', resp.data.data.authToken)
                    }else{
                        window.sessionStorage.setItem('authToken', resp.data.data.authToken)
                    }
                    dispatch(loginSuccess(resp.data.data))
                }else{
                    dispatch(loginFailed())
                }
            }
        )
    }
}