import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import CardComponent from '../components/cardComponent'
import './common.css'
function Matches() {
    const [users, setUsers] = useState()
    const [interest, setInterest] = useState(false)
    const [checkusers,setcheckUsers]=useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    useEffect(()=>{
            console.log(`Bearer ${token}`)
            handlematches()
        },[])

        const handlematches = () =>{
            fetch('http://localhost:8080/preference',{
            method:'POST',
            headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
        }).then(res =>{
                if(res.ok){
                    return res.json()
                }
            }).then(data =>{
                setInterest(true)
                setUsers(data)
                setcheckUsers(true)
            })
        }

        const handleinterest = (username) => {
            console.log(username)
            console.log(token)
            fetch(`http://localhost:8080/interest/${username}`,{
                method:'POST',
                headers:{'Authorization': `Bearer ${token}`}
            }).then(res =>{
                if(res.ok){
                    console.log(res)
                    handlematches()
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
                    return <CardComponent key ={user.id} image={user.image} name={`${user.fname} ${user.lname}`} dob={user.dob} email={user.email} religion={user.religion} gender={user.gender} id={user.id} city={user.city} mstatus={user.maritalstatus} Interest={false} togglebtn={true} buttontext={"Send Interest"}sent={false} onClick={()=> handleinterest(user.email)} onhandleaccpet={()=>handleaccpet(user.id)}/>
                    })
                }        
        </div>
    )
}

export default Matches
