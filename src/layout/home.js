import React,{ useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import CardComponent from '../components/cardComponent'
import './common.css'
function Home() {
    const [users, setUsers] = useState()
    const [change, setchange] =useState(true)
    const [checkusers,setcheckUsers]=useState(false)
    const [interest, setInterest] = useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    useEffect(()=>{
        console.log(`Bearer ${token}`)
        fetch('http://localhost:8080/matching',{
            method:'POST',
            headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
        }).then(res =>{
            console.log(res)
                if(res.ok){
                    return res.json()
                }
            }).then(data =>{
                console.log(data)
                setInterest(false)
                if(data)
                setUsers(data)
                setcheckUsers(true)
            })
        },[change])


        // const handlehome =( ) =>{
            
        // }

        
    const handleinterest = (email) => {
        console.log(email)
        console.log(token)
        fetch(`http://localhost:8080/interest/${email}`,{
            method:'POST',
            headers:{'Authorization': `Bearer ${token}`}
        }).then(res =>{
            if(res.ok){
                console.log(res)
                setchange(!change)
            }else{
                throw 'error'
            }
        }).catch(error =>{
            alert("Interest page"+error)
        })
    }

    const handleaccpet = (params) =>{
        fetch(`http://localhost:8080/accept/${params}`,{
            method:'POST',
            headers:{'Authorization': `Bearer ${token}`}
        }).then(res =>{
            if(res.ok){
                console.log(res)
            }
        })
    }

    return (
        <div className='card-row'>
                {checkusers && users.map( user =>{
                    return <CardComponent user={user} image={user.image} name={`${user.fname} ${user.lname}`} dob={user.dob} email={user.email} religion={user.religion} gender={user.gender} id={user.id} city={user.city} mstatus={user.maritalstatus} interest={interest} togglebtn= {true} buttontext="Send Interest" onClick={()=> handleinterest(user.email)}/>
                    })
                }        
        </div>
    )
}

export default Home
