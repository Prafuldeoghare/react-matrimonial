import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import './dashboard_nav.css'
function DashboardNav() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)

    const pendingHandler =() =>{
        fetch('http://localhost:8080/pending',{
            method:'GET',
            headers:{'Content-Type':'application/json', 'Authorization' :`Bearer ${token}`}
        }).then(res =>{
            return res.json()
        }).then(data =>{
            console.log(data)
            dispatch({type:'pendingdata',payload: data})
        })
    }

    const acceptedHandler =() =>{
        fetch('http://localhost:8080/accept',{
            method:'GET',
            headers:{'Content-Type':'application/json', 'Authorization' :`Bearer ${token}`}
        }).then(res =>{
            return res.json()
        }).then(data =>{
            console.log(data)
            dispatch({type:'accepteddata',payload:data})
        })
    }

    return (
        <div className='interest-nav'>
            <nav>
                <ul className='interest-list'>
                    <li className={false && 'interestbutton'} onClick={pendingHandler}>Pending Profile</li>
                    <li className={false && 'interestbutton'} onClick={acceptedHandler}>Accepted Profile</li>
                </ul>
            </nav>
        </div>
    )
}

export default DashboardNav
