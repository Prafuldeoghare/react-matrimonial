import React, { useState,useEffect } from 'react'
import './cardComponent.css'
import man from '../assets/man.png'
import woman from '../assets/woman.png'
import Profile from './profile'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
Modal.setAppElement('#root')
function CardComponent(props) {
    const [img, setimg] =  useState(true)
    const [contact, setcontact] =useState(false)
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const viewcontact = useSelector(state => state.viewcontact.viewcontact)
    const toggle = useSelector(state => state.user.toggle)


    const handleviewprofile = () =>{
        console.log("test");
        console.log(props.email);
        fetch(`http://localhost:8080/view_details/${props.email}`,{
            method:'POST',
            headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`, "Access-Control-Allow-Origin": "*" }
        }).then(res =>{
            console.log("test2")
            return res.json()
        }).then(data => {
            console.log(data)
            {(toggle.interestpage || toggle.matchespage) ? dispatch({ type:'modaltoggle', payload: data }) : dispatch({ type:'viewprofile', payload: data })}
        })
    }

    // const handlemodal = () =>{
    //     console.log('modal')
    //     fetch(`http://localhost:8080/view_details/${props.email}`,{
    //         method:'POST',
    //         headers:{'Content-Type':'application/json', 'Authorization': `Bearer ${token}`, "Access-Control-Allow-Origin": "*"  }
    //     }).then(res =>{
    //         const data = JSON.parse(res)
    //             console.log(data)
    //     })
    //     // }).then(data => {
    //     //     dispatch({ type:'modaltoggle', payload: data })
    //     // })
    // }

    return (
        <>
        <div className='card'>
            <div className='card-container'>
                <div className='card-image'>
                    {console.log(props.gender)}
                    {props.image !== null ? <img src={props.image}/> : props.gender==="Men" ? <img src={man} />:  <img src={woman} /> }
                </div>
                <div className='card-details'>
                    <span>{props.name}</span>
                    <table>
                        <tr>
                            <td className='table-category'>Date of Birth</td>
                            <td>:</td>
                            <td>{props.dob}</td>
                        </tr>
                        <tr>
                            <td className='table-category'>Religion</td>
                            <td>:</td>
                            <td>{props.religion}</td>
                        </tr>
                        <tr>
                            <td className='table-category'>City</td>
                            <td>:</td>
                            <td>{props.city}</td>
                        </tr>
                        <tr>
                            <td className='table-category'>Marital Status</td>
                            <td>:</td>
                            <td>{props.mstatus}</td>
                        </tr>
                    </table>
                    <div className='card-button'>
                        <button onClick={handleviewprofile}>View Profile</button>
                        {props.togglebtn && <button onClick={props.onClick}>{props.buttontext}</button>} 
                        {/* <button onClick={()=> setcontact(true)}>contact</button> :<button onClick={props.onClick}>Send Interest</button>} */}
                    </div>
                </div>
            </div>
        </div>
        
        <Modal isOpen={viewcontact} 
             style={
                 {
                     overlay: {
                         background: 'rgba(0,0,0,0.5)',
                        },
                    content: {
                        color: 'lightsteelblue',
                        padding: '0px',
                        top: '43%',
                        left: '35%',
                        right: '35%',
                        bottom: '43%',
                        textAlign:'center'
                    }
                 }
             }
            >
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                    <span style={{marginTop:'1em',color:'#000000'}}>Contact No: {props.phoneno}</span>
                    <button onClick={()=> dispatch({type:'viewcontact'})} style={{marginTop:'1em',padding:'0.5em 1em',border:'none',backgroundColor:'#FF4F80',color:'#ffffff', width:'fit-content'}}>back</button>
                </div>
            </Modal>
    </>
    )
}
        
export default CardComponent
