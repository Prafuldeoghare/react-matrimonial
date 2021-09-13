import react from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Fragment } from 'react'
import DashboardNav from '../components/dashboard_nav'
import DashboardContainer from '../components/dashboardContainer'
import Home from './home'
import Interest from './interest'
import Matches from './matches'
import Modal from 'react-modal'
import Profile from '../components/profile'
import ChangePassword from '../components/changePassword'
import Editprofile1 from '../components/editprofile1'
Modal.setAppElement('#root')
export default function Userlayout(){
    const toggle = useSelector(state => state.user.toggle)
    const dispatch = useDispatch()
    const modaltoggle = useSelector(state => state.user.modaltoggle)
    return (
        <Fragment>
            <DashboardContainer />
            {toggle.homepage && <Home />}
            {toggle.interestpage && <Interest />}
            {toggle.matchespage && <Matches />}
            {toggle.viewprofile && <Profile />}
            {toggle.editpages && <Editprofile1 />}
            {toggle.changep && <ChangePassword />}
            <Modal isOpen={modaltoggle} shouldCloseOnOverlayClick={false} 
             style={
                 {
                     overlay: {
                         background: 'rgba(0,0,0,0.5)',
                        },
                    content: {
                        color: 'lightsteelblue',
                        padding: '0px',
                        top: '40px',
                        left: '40px',
                        right: '40px',
                        bottom: '40px',
                        textAlign:'center'
                    }
                 }
             }
            >
            <Profile />
            <button style={{padding:'0.5em 1em',fontSize:'1.2rem',backgroundColor:'#FF4F80',marginTop:'2em',border:'none',color:'#ffffff'}} onClick={()=> dispatch({type:'modaltoggle',payload:{address:'',caste:'',city:'',dob:'',email:'',fname:'',lname:'',gender:'',id:'',image:'',maritalstatus:'',mobileno:'',mother_tongue:'',password:'',preference:{pmarital_status:"null", preligion:"null"}}})}>close</button>
        </Modal>
        </Fragment>
    )
}

