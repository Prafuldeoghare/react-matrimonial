import React, {useState}from 'react'
import './nav.css'
import Form from './form'
import { RiHeartsFill } from 'react-icons/ri'
import Modal from 'react-modal';
import {useDispatch, useSelector} from 'react-redux'
Modal.setAppElement('#root')
function Nav() {
    const dispatch = useDispatch();
    const admin = useSelector(state => state.adminlogin.admin)
    const signup = useSelector(state => state.adminlogin.signup)
    return (
        <div className='navbar'>
            <nav>
                <div className='nav-title'>
                    <RiHeartsFill className='nav-icons'/>
                    <span>Wedding Bells</span>
                </div>
                <ul>
                    <li onClick={()=> dispatch({type: 'changesignup'})}>Sign Up</li>
                    <li onClick={()=> dispatch({type: 'changeadmin'})}>{admin ? 'login' : 'Admin login'}</li>
                </ul>
            </nav>
            <Modal isOpen={signup} shouldCloseOnOverlayClick={false} 
             style={
                 {
                     overlay: {
                         background: 'rgba(0,0,0,0.5)',
                        },
                    content: {
                        color: 'lightsteelblue',
                        padding: '0px',
                        top: '40px',
                        left: '300px',
                        right: '300px',
                        bottom: '40px',
                        textAlign:'center'
                    }
                 }
             }
            >
            <Form />
            </Modal>
        </div>
    )
}

export default Nav
