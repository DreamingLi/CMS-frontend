import actionTypes from '../actions/actionTypes'

const initState = {
    isLoading: false,
    list:[
        {
            id:1,
            title: 'Lorem111',
            desc: '111',
            hasRead: false
        },
        {
            id:2,
            title: 'Lorem222',
            desc: '222',
            hasRead: true
        }
    ]
}
export const notifications = (state=initState,action) => {
    switch(action.type){
        case actionTypes.MARK_NOTIFICATIONS_AS_READ_BY_ID:
            const newList = state.list.map(
                item => {
                    if (item.id === action.payload.id){
                        item.hasRead = true
                    }
                    return item
                }
            )
            return {
                ...state,
                list:newList
            }

        case actionTypes.MARK_ALL_NOTIFICATIONS_AS_READ_BY_ID:
            return {
                ...state,
                list: state.list.map(item =>{
                    item.hasRead = true
                    return item
                })
            }

        case actionTypes.START_MARK_AS_READ:
            return {
                ...state,
                isLoading:true
            }
        case actionTypes.FINISH_MARK_AS_READ:
            return {
                ...state,
                isLoading:false
            }
        case actionTypes.RECEIVED_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.list
            }
        default:
            return state
    }
}

