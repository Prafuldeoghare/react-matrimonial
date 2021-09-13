import React, { useEffect, useState } from 'react'
import './adminBoard.css'

import { RiHeartsFill } from 'react-icons/ri'
import {FaUserCircle} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

function AdminBoard() {
    const [user, setUser]=useState()
    const [checkuser,setcheckuser]=useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [button, setbutton] = useState({all:true, auth:false,unauth:false})
    const [showbutton, setshowbutton] = useState(true)
    const [showstatus, setshowstatus] = useState(false)

    useEffect(()=>{   
        fetch('http://localhost:8080/admin/allUsers').then(res=>{
            if(res.ok){
                return res.json()
            }else{
                let error='error'
                throw error
            }
        }).then(data=>{
            console.log(data)
            setUser(data)
            setshowbutton(true)
            setcheckuser(true)
        }).catch( error =>{
            alert(error)
        })
    } ,[])

    const handleUsers = (params) =>{
        let uri=''
        switch(params){
            case 'allUsers':
                uri= 'http://localhost:8080/admin/allUsers'
                setshowbutton(true)
                setcheckuser(true)
                setshowstatus(false)
                setbutton({all:true,auth:false,unauth:false})
                break
            case 'authenticatedUsers':
                uri= 'http://localhost:8080/admin/actUsers'
                setshowbutton(false)
                setcheckuser(true)
                setshowstatus(true)
                setbutton({all:false,auth:true,unauth:false})
                break
            case 'unauthenticatedUsers':
                uri='http://localhost:8080/admin/unactUsers'
                setshowbutton(false)
                setcheckuser(true)
                setshowstatus(false)
                setbutton({all:false,auth:false,unauth:true})
                break
            default: 
                uri= null
                break
        }
        fetch(uri).then(res => {
            return res.json()
        }).then(data => {
            if(data !== null ){
                setUser(data)
                setcheckuser(true)
            }else{
                setcheckuser(false)
            }

        })
    }

    const handleactivate = (username) =>{
        fetch(`http://localhost:8080/admin/active/${username}`,{
            method:'POST',
            body: JSON.stringify(username),
            headers: {'Content-Type':'application/json'}
        }).then( res => {
            return res.json();
        }).then(data => {
            setUser(data)
            setcheckuser(true)
        })
    }

    return (
        <>
        <div className='adminboard-nav'>
            <nav>
                <div className='adminnav-title'>
                    <RiHeartsFill className='adminnav-icons'/>
                    <span>Wedding Bells</span>
                </div>
                <ul className='admin-list'>
                    <li className={button.all && 'buttonactive'} onClick={ ()=> handleUsers('allUsers') }><FaUserCircle className='adminlist-icon'/>All Registered Users</li>
                    <li className={button.auth && 'buttonactive'} onClick={ ()=> handleUsers('authenticatedUsers') }><FaUserCircle className='adminlist-icon'/>Authenticated Users</li>
                    <li className={button.unauth && 'buttonactive'} onClick={ ()=> handleUsers('unauthenticatedUsers') }><FaUserCircle className='adminlist-icon'/>Unauthenticated Users</li>
                    <li onClick={
                        () => {
                            history.push('/')
                            dispatch({type:'authadmin'})
                        }
                    }><FaUserCircle className='adminlist-icon'/>logout</li>
                </ul>
            </nav>
        </div>
            <div className='admindashboard'>
            <table>
                <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Religious</th>
                    <th>Mother Tongue</th>
                    <th>City</th>
                    <th>Email</th>
                    {showstatus && <th>Status</th>}
                    {showbutton && <th>Action</th>}
                </tr>
                </thead>
            <tbody>
            {checkuser && user.map( res =>{
                       return(
                           <tr key={res.email}>
                                <td>{res.fname + ' ' + res.lname}</td>
                                <td>{res.gender}</td>
                                <td>{res.dob}</td>
                                <td>{res.religion}</td>
                                <td>{res.mother_tongue}</td>
                                <td>{res.city}</td>
                                <td>{res.email}</td>
                                {showstatus && <td>{res.status ? 'active' : 'deactive'}</td>}
                                {showbutton && <td><button onClick={()=>handleactivate(res.email)}>{res.status ? 'dectivate' : 'activate'}</button></td>}
                            </tr>
                       )
                       }
                    )}
                </tbody>
                </table>     
            </div>
        </>
    )
}

export default AdminBoard
