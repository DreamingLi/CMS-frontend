import actionTypes from './actionTypes'
import { getNotifications} from '../requests'

const startMarkAsRead = () =>{
    return {
        type: actionTypes.START_MARK_AS_READ
    }
}

const finishMarkAsRead = () =>{
    return {
        type: actionTypes.FINISH_MARK_AS_READ
    }
}

export const markNotificationAsRead = (id) =>{
    return dispatch => {
        dispatch(startMarkAsRead())
        setTimeout(
            ()=>{
                dispatch({
                    type:actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID,
                    payload:{
                        id
                    }
                });
                dispatch(finishMarkAsRead());
            },2000)
    }
}

export const markAllNotificationAsRead = () => {

    return dispatch => {
        dispatch(startMarkAsRead())
        setTimeout(
            () => {
                dispatch({
                    type:actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ_BY_ID
                });
                dispatch(finishMarkAsRead());
            },2000)
    }
}

export const getNotificationList = () => {

    return dispatch => {
        console.log(1111)
        dispatch(startMarkAsRead())
        getNotifications().then(
            resp =>{
                dispatch({
                    type:actionTypes.RECEIVED_NOTIFICATIONS,
                    payload:{
                        list: resp.list
                    }
                })
                dispatch(finishMarkAsRead());
            }
        )
    }
}