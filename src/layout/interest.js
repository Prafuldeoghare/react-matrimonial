import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Acceptedrequest from '../components/acceptedrequest'
import Profile from '../components/profile'
import Receivedrequest from '../components/receivedrequest'
import Sentrequest from '../components/sentrequest'
import Modal from 'react-modal'
import './common.css'
function Interest() {
    const [active,setactive] = useState({rr:true,sr:false,ar:false})
    const toggle = useSelector(state => state.user.toggle)
    const dispatch = useDispatch()
    const modaltoggle = useSelector(state => state.user.modaltoggle)
    return (
        <div className='card-row'>
            <div className='interest-nav'>
            <nav>
                <ul className='interest-list'>
                    <li className={active.rr && 'interestbutton'} onClick={()=> setactive({rr:true,sr:false,ar:false})}>Received Requests</li>
                    <li className={active.sr && 'interestbutton'} onClick={()=> setactive({rr:false,sr:true,ar:false})}>Sent Requests</li>
                    <li className={active.ar && 'interestbutton'} onClick={()=> setactive({rr:false,sr:false,ar:true})}>Accepted Requests</li>
                </ul>
            </nav>
        </div>
            <div style={{width:'95vw',height:"auto",position:'relative',margin: "0 auto",display:'flex',flexWrap:'wrap'}}>
            {active.rr && <Receivedrequest />}
            {active.sr && <Sentrequest />}
            {active.ar && <Acceptedrequest />}  
            </div>      
        </div>
    )
}

export default Interest
