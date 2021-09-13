const redux= require('redux');

const adminloginstate={
    admin: false,
    signup:false,
    adminav: true,
}

const message={
    showmessage: false,
    message: ''
}

const authAdminlogin={
    isadminLoggedin: false
}

const authUserlogin={
    isuserLoggedin: false,
    token: '',
    toggle: {homepage:true, interestpage: false, matchespage: false, editpage:false,viewprofile:false,changep:false},
    profiledata:[],
    modaltoggle: false,
    name:''
}

const interestdata = {
    pendingdata: [],
}

const forgetpassword = {
    forgetpass: false
}

const fpasswordreducer = (state=forgetpassword,action) =>{
    switch(action.type){
        case 'togglefpassword': 
            return{
                forgetpass :!state.forgetpass
            }
        default : return state
    }
}

const messageReducer = (state=message,action) => {
    switch(action.type){
    case 'messages':
            return{
                message: action.payload,
                showmessage: !state.showmessage
            }
    default : return state
    }
}

const adminreducer =(state=authAdminlogin, action) => {
    switch(action.type){
        case 'authadmin':
            return{
                isadminLoggedin: !state.isadminLoggedin,
            }
        default : return state 
    }
}

const userreducer =(state=authUserlogin, action) => {
    switch(action.type){
        case 'authuser':
            return{
                isuserLoggedin: !state.isuserLoggedin,
                token: action.payload.token,
                toggle: {homepage:true, interestpage: false, matchespage: false, editpage:false,viewprofile:false,changep:false},
                name: action.payload.fname+' '+action.payload.lname
            }
        case 'homepage':
            return{
                ...state,
                toggle: {homepage:true, interestpage: false, matchespage: false, editpage:false,viewprofile:false,changep:false},
            }
        case 'interestpage':
            return{
                ...state,
                toggle: {homepage:false, interestpage: true, matchespage: false, editpage:false,viewprofile:false,changep:false},
            }
        case 'matchespage':
            return{
                ...state,
                toggle: {homepage:false, interestpage: false, matchespage: true, editpage:false,viewprofile:false,changep:false}
            }
        case 'editpages':
            return{
                ...state,
                toggle: {homepage:false, interestpage: false, matchespage: false, editpages:true,viewprofile:false,changep:false}
            }
        case 'viewprofile':
            return{
                ...state,
                toggle: {homepage:false, interestpage: false, matchespage: false, editpages:false,viewprofile:true,changep:false},
                profiledata: action.payload,
            }
        case 'changep':
            return{
                ...state,
                toggle: {homepage:false, interestpage: false, matchespage: false, editpages:false,viewprofile:false,changep:true},
            }
        case 'modaltoggle':
            return{
                ...state,
                profiledata: action.payload,
                modaltoggle: !state.modaltoggle
            }
        default : return state 
    }
}




const adminloginreducer = (state=adminloginstate, action) => {
    switch(action.type){
        case 'changeadmin':
            return {
                ...state,
                admin: !state.admin
            }
        case 'changesignup':
            return{
                ...state,
                signup: !state.signup
            }
        case 'adminside':
            return{
                ...state,
                adminav: !state.adminnav
            }
        default : return state   
    }
}


const interestdatareducer = (state=interestdata,action) =>{
    switch(action.type){
        case 'pendingdata':
            return{
                pendingdata: action.payload,
            }
        case 'accepteddata':
            return{
                pendingdata: action.payload,                
            }
        default : return state
    }
}

const viewcontactreducer =(state={viewcontact: false},action) =>{
    switch(action.type){
        case 'viewcontact':
            return{
                 viewcontact: !state.viewcontact
            }
        default : return state  
    }
}

const reducer=redux.combineReducers({
    admin: adminreducer,
    user: userreducer,
    adminlogin: adminloginreducer,
    messageReducer: messageReducer,
    interestdata: interestdatareducer,
    fpassword: fpasswordreducer,
    viewcontact: viewcontactreducer
    // profile: profilereducer
})

const store = redux.createStore(reducer)
console.log(store.getState())
export default store
