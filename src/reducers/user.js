import actionType from '../actions/actionTypes'
const isLogin = Boolean(window.localStorage.getItem('authToken')) || Boolean(window.sessionStorage.getItem('authToken'))

const initState = {
    id: '',
    displayName: '',
    avatar: '',
    role: '',
    isLogin: isLogin,
    isLoading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case actionType.START_LOGIN:
            return ({
                ...state,
                isLoading: true
            })
        case actionType.LOGIN_SUCCESS:
            return ({
                ...state,
                ...action.payload.userInfo,
                isLoading: false,
                isLogin: true
            })
        case actionType.LOGIN_FAILED:
            return  ({
                initState
            })
        default:
            return state
    }
}