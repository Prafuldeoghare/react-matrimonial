import React, { useState,useEffect } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CardComponent from './cardComponent'
import { RiHeartsFill } from 'react-icons/ri'
import {FaHome,FaHandHoldingHeart, FaHeart, FaUserCircle} from 'react-icons/fa'
import './dashboardContainer.css'
import Profile from './profile'
function DashboardContainer() {
    const [Name, setName] = useState()
    const dispatch = useDispatch()
    const history =useHistory()
    const token = useSelector(state => state.user.token)
    const name = useSelector(state => state.user.name)
    const [button, setbutton] = useState({home:true, interest:false,matches:false,profile:false})

    useEffect(()=>{

    },[])

    const handlehome = (param) =>{
        switch(param){
            case 'home':
                dispatch({type:'homepage'})
                setbutton({home:true, interest:false,matches:false,profile:false})
                break
            case 'interest':
                dispatch({type:'interestpage'})
                setbutton({home:false, interest:true,matches:false,profile:false})
                break
            case 'matches':
                dispatch({type:'matchespage'})
                setbutton({home:false, interest:false,matches:true,profile:false})
                break
            case 'profile':
                dispatch({type: 'editpages'})
                setbutton({home:false, interest:false,matches:false,profile:true})
                break
            case 'logout':
                history.push('/')
                dispatch({type: 'authuser', payload:''})
                break
            default: 
                dispatch({type:'homepage'})
                setbutton({home:true, interest:false,matches:false,profile:false})
                break
        }
    }

    const handleChange = (e) =>{
        console.log(e.target.value)
        switch(e.target.value){
            case 'Edit Profile':
                dispatch({type: 'editpages'})
                setbutton({home:false, interest:false,matches:false,profile:true})
                break
            case 'Change Password':
                dispatch({type:'changep'})
            break
            case 'View Profile':
                fetch('http://localhost:8080/profile',{
                    method:'POST',
                    headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
                }).then(res=>{
                    return res.json()
                }).then(data=>{
                    dispatch({type:'viewprofile',payload: data})
                })
                break
            case 'Delete Profile':
                fetch('http://localhost:8080/deleteprofile',{
                    method:'GET',
                    headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` },
                }).then(res =>{
                    if(res.ok){
                        this.props.history.push('/')
                    }
                })
                break
            case 'Logout':
                history.push('/')
                dispatch({type: 'authuser', payload:''})
                break
            default: return null
        }
    }
    return (
        <div className='dashboard'>
             <div className='dashboard-nav'>
            <nav>
                <div className='dashnav-title'>
                    <RiHeartsFill className='dashnav-icons'/>
                    <span onClick={()=>handlehome('home')}>Wedding Bells</span>
                </div>
                <ul className='dash-list'>
                    <li className={button.home && 'dashbutton'} onClick={()=>handlehome('home')}><FaHome className='dashlist-icon icon1'/>Home</li>
                    <li className={button.interest && 'dashbutton'} onClick={()=>handlehome('interest')} ><FaHandHoldingHeart className='dashlist-icon'/>Interests</li>
                    <li className={button.matches && 'dashbutton'} onClick={()=>handlehome('matches')}><FaHeart className='dashlist-icon'/>Matches</li>
                    <li><FaUserCircle className='dashlist-icon'/>{name}
                        <select name='Profile' onChange={handleChange}>
                            <option>-----</option>
                            <option>View Profile</option>
                            <option>Edit Profile</option>
                            <option>Change Password</option>
                            <option>Delete Profile</option>
                            <option>Logout</option>
                        </select>
                    </li>
                    {/* <li className={button.profile && 'dashbutton'} onClick={()=>handlehome('profile')}><FaUserCircle className='dashlist-icon'/>Profile</li> */}
                    {/* <li onClick={()=>handlehome('logout')}><FaUserCircle className='dashlist-icon'/>Logout</li> */}
                </ul>
            </nav>
        </div>
    </div>
    )
}

export default DashboardContainer
