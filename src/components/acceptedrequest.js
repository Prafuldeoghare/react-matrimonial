import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from './cardComponent';
function Acceptedrequest() {
    const [users, setUsers] = useState()
    const [acceptusers, setacceptUsers] = useState()
    const [checkusers, setCheckusers] = useState(false)
    const [checkausers, setCheckausers] = useState(false)
    const token = useSelector(state => state.user.token)
    const dispatch= useDispatch()
    useEffect(()=>{    
        accept()
        accept_to()
    },[])

    const accept=()=>{
        fetch('http://localhost:8080/accept',{
                method:'GET',
                headers:{'Content-Type':'application/json', 'Authorization' :`Bearer ${token}`}
            }).then(res =>{
                console.log(res)
                return res.json()
            }).then(data =>{
                console.log(data)
                setUsers(data)
                setCheckusers(true)
            })
    }

    const accept_to = () =>{
        fetch('http://localhost:8080/accept_to',{
            method:'GET',
            headers:{'Content-Type':'application/json', 'Authorization' :`Bearer ${token}`}
        }).then(res =>{
            console.log(res)
            return res.json()
        }).then(data =>{
            console.log(data)
            if(data !== null){
            setacceptUsers(data)
            setCheckausers(true)
            }else{
            setCheckausers(false)
            }
        })
    }

    return (
        <div style={{width:'100%',display:"flex",flexWrap:'wrap'}}>
            {checkusers && users.map( user =>{
                return <CardComponent image={user.image} name={`${user.fname} ${user.lname}`} gender={user.gender} email={user.email} dob={user.dob} religion={user.religion} id={user.id} city={user.city} phoneno={user.mobileno} mstatus={user.maritalstatus} togglebtn={true} onClick={()=> dispatch({type:'viewcontact'})} buttontext={'Contact'}/>
                })
            }
            {checkausers && acceptusers.map( user =>{
                return <CardComponent image={user.image} name={`${user.fname} ${user.lname}`} dob={user.dob} email={user.email} gender={user.gender} religion={user.religion} id={user.id} city={user.city} phoneno={user.mobileno} mstatus={user.maritalstatus} togglebtn={true} onClick={()=> dispatch({type:'viewcontact'})} buttontext={'Contact'}/>
                })
            }  
        </div>
    )
}

export default Acceptedrequest
