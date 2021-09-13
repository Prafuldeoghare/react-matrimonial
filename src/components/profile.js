import React,{useState} from 'react'
import './profile.css'
import man from '../assets/man.png'
import woman from '../assets/woman.png'
import { RiCloseCircleLine } from 'react-icons/ri'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
function Profile(props) {
    const [viewusers, setviewusers] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.profiledata)
    const toggle = useSelector(state => state.user.toggle)
    useEffect(()=>{
        if(user != null){
            setviewusers(true)
        }  
        console.log(user)      
    },[])

    return (
        <div className='profile'>
            <div className='profile-container'>
                <div className='aside-container'>
                    <aside>
                        {user.image !== null ? <img src={user.image} /> : user.gender === "Male" ? <img src={man} />: <img src={woman} />}
                        {viewusers && <span>{user.fname+ ' '+ user.lname}</span>}
                    </aside>
                </div>
                <div className='main-container'>
                    <main>
                    { viewusers && <fieldset>
                        <legend>Basic Information</legend>
                        <table>
                            <tr>
                                <td className='table-category'>Gender</td>
                                <td>:</td>
                                <td>{user.gender}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>Date of Birth</td>
                                <td>:</td>
                                <td>{user.dob}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>Religious</td>
                                <td>:</td>
                                <td>{user.religion}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>Mother Tongue</td>
                                <td>:</td>
                                <td>{user.mother_tongue}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>City</td>
                                <td>:</td>
                                <td>{user.city}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>Marital Status</td>
                                <td>:</td>
                                <td>{user.maritalstatus}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>caste</td>
                                <td>:</td>
                                <td>{user.caste == null ? 'Not Specified' : user.caste}</td>
                            </tr>
                        </table>
                    </fieldset>}
                    { viewusers && <fieldset>
                        <legend>Preference Information</legend>
                        <table>
                            <tr>
                                <td className='table-category'>Marital Status</td>
                                <td>:</td>
                                <td>{user.preference.pmarital_status === "null" ? 'Not Specified' : user.preference.pmarital_status}</td>
                            </tr>
                            <tr>
                                <td className='table-category'>Religion</td>
                                <td>:</td>
                                <td>{user.preference.preligion === "null" ? 'Not Specified' : user.preference.preligion}</td>
                            </tr>
                        </table>
                    </fieldset>}
                    </main>
                    <div className='closebutton'>
                        <RiCloseCircleLine onClick={()=> dispatch({type:'homepage'})}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
