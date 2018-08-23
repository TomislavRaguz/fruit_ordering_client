export default (state={ loading:false, user:null },action)=>{
    console.log(action);
    switch(action.type){
        case 'LOGIN_REQUESTED':
            return {
                loading: true,
                user: null
            }
        case 'LOGIN_SUCCESS':
            return {
                loading: false,
                user: action.user
            }
        case 'LOGIN_FAILURE':
            return {
                loading: false,
                user: null
            }    
        case 'LOGOUT':
            return {
                loading: false,
                user: null
            }
        default:
            return state
    }
}