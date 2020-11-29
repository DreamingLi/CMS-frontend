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
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('userInfo')
    return ({
        type:actionType.LOGIN_FAILED
    })
}

export const changeAvatar = avatarUrl => {
    return {
        type: actionType.CHANGE_AVATAR,
        payload: {
            avatarUrl
        }
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(loginFailed())
    }
}

export const login = userInfo => {
    return dispatch => {
        dispatch(startLogin())

        loginRequest(userInfo).then(
            resp =>{
                if (resp.data.code === 200 ){
                    const remember = userInfo.remember
                    const {
                        authToken,
                        ...userReceiveInfo
                    } = resp.data.data
                    console.log( )
                    if (remember === true){
                        window.localStorage.setItem('authToken', authToken)
                        window.localStorage.setItem('userInfo', JSON.stringify(userReceiveInfo))
                    }else{
                        window.sessionStorage.setItem('authToken', authToken)
                        window.sessionStorage.setItem('userInfo', JSON.stringify(userReceiveInfo))
                    }
                    dispatch(loginSuccess(resp.data.data))
                }else{
                    dispatch(loginFailed())
                }
            }
        )
    }
}