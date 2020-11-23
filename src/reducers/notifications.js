

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
export default (state=initState,action) => {
    switch(action.type){
        default:
            return state
    }
}