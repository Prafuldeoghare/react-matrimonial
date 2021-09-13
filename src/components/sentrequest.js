import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CardComponent from './cardComponent';
function Sentrequest() {
    const [users, setUsers] = useState();
    const [checkusers, setCheckusers] = useState(false)
    const token = useSelector(state => state.user.token)

    useEffect(()=>{
            fetch('http://localhost:8080/pending',{
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
    },[])

    return (
        <div style={{width:'100%',display:"flex",flexWrap:'wrap'}}>
            {checkusers && users.map( user =>{
                return <CardComponent image={user.image} name={`${user.fname} ${user.lname}`} gender={user.gender} email={user.email} dob={user.dob} religion={user.religion} id={user.id} city={user.city} phoneno={user.mobileno} mstatus={user.maritalstatus} togglebtn={false}/>
                })
            }  
        </div>
    )
}

export default Sentrequest
