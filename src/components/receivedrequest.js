import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CardComponent from './cardComponent';
function Receivedrequest() {
    const [users, setUsers] = useState();
    const [checkusers, setCheckusers] = useState(false)
    const token = useSelector(state => state.user.token)
    useEffect(()=>{
            fetch('http://localhost:8080/interestedPeople',{
                method:'POST',
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

    const profilehandler=()=>{
        fetch('http://localhost:8080/interestedPeople',{
            method:'POST',
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

    const handleaccept = (params) =>{
        fetch(`http://localhost:8080/accept/${params}`,{
            method:'POST',
            headers:{'Authorization': `Bearer ${token}`}
        }).then(res =>{
            if(res.ok){
                console.log(res)
                profilehandler()

            }
        })
    }

    return (
        <div style={{width:'100%',display:"flex",flexWrap:'wrap'}}>
            {checkusers && users.map( user =>{
                return <CardComponent image={user.image} name={`${user.fname} ${user.lname}`} gender={user.gender} dob={user.dob} religion={user.religion} id={user.id} city={user.city} email={user.email} phoneno={user.mobileno} mstatus={user.maritalstatus} togglebtn={true} buttontext={'Accept'} onClick={()=>handleaccept(user.id)}/>
                })
            }  
        </div>
    )
}

export default Receivedrequest
