import React,{useState, useEffect} from 'react'
import "./editprofile.css"
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FaExclamationCircle } from 'react-icons/fa'
import man from '../assets/man.png'
function Editprofile1() {
        const [user, setuser] = useState({address:'',caste:'',city:'',dob:'',email:'',fname:'',lname:'',gender:'',id:'',image:'',maritalstatus:'',mobileno:'',mother_tongue:'',password:'',preference:{pmarital_status:"null", preligion:"null"}});
        const [error, seterror] = useState({fname:false,lname:false,dob:false,religion:false,mother_tongue:false,city:false,mobileno:false,gender:false,maritalstatus:false,caste:false,address:false});
        const token= useSelector( state => state.user.token)
        const dispatch = useDispatch()
    useEffect(()=>{
        fetch('http://localhost:8080/profile',{
            method:'POST',
            headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
        }).then(res=>{
            return res.json()
        }).then(data=>{ 
            console.log(data)
            setuser(data)
        })
    },[])

    const fetchdata=()=>{
        fetch('http://localhost:8080/profile',{
            method:'POST',
            headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
        }).then(res=>{
            return res.json()
        }).then(data=>{ 
            console.log(data)
            setuser(data)
        })
    }

    const handleRegistration = async (e) =>{
        console.log(user)
        e.preventDefault()
        let validation= handleValidation();
        if(validation){
        fetch(`http://localhost:8080/updateprofile/${user.preference.p_id}/${user.preference.pmarital_status}/${user.preference.preligion}`,{
                method:'POST',
                body:JSON.stringify({
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    image: user.image,
                    gender: user.gender,
                    fname: user.fname,
                    lname: user.lname,
                    dob: user.dob,
                    religion: user.religion,
                    mother_tongue: user.mother_tongue,
                    city: user.city,
                    mobileno: user.mobileno,
                    maritalstatus: user.maritalstatus,
                    caste:user.caste, 
                    address:user.address,
                }),
                headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
            }).then((res)=>{
                if(res.ok){
                    dispatch({type:'messages',payload:'Profile Updated!!'})
                    return res.json()
                }else{
                }
            }).then((data)=>{
                fetchdata()
            }).catch((error)=>{   
                dispatch({type:'messages',payload: error })
            })
        }else{
            alert('Please Enter Required Fields')
        }

    }

    const handleValidation = () =>{
        let formIsValid = true;

         if(!user.fname){
            formIsValid = false;
            seterror({...error,fname:true})
         }else{
            seterror({...error,fname:false})
         }

         if(!user.lname){
            formIsValid = false;
            seterror({...error,lname:true})
         }else{
            seterror({...error,lname:false})
         }

        if(!user.dob){
            formIsValid = false;
            seterror({...error,dob:true})
         }else{
            seterror({...error,dob:false})
         }

         if(!user.religion){
            formIsValid = false;
            seterror({...error,religion:true})
         }else{
            seterror({...error,religion:false})
         }

         if(!user.mother_tongue){
            formIsValid = false;
            seterror({...error,mother_tongue:true})
         }else{
            seterror({...error,mother_tongue:false})
         }

         if(!user.city){
            formIsValid = false;
            seterror({...error,city:true})
         }else{
            seterror({...error,city:false})
         }
        
         if(!user.mobileno){
            formIsValid = false;
            seterror({...error,mobileno:true})
         }else{
            seterror({...error,mobileno:false})
         }

         if(!user.gender){
            formIsValid = false;
            seterror({...error,gender:true})
         }else{
            seterror({...error,gender:false})
         }
         
         if(!user.address){
            formIsValid = false;
            seterror({...error,address:true})
         }else{
            seterror({...error,address:false})
         }

         if(!user.maritalstatus){
            formIsValid = false;
            seterror({...error,maritalstatus:true})
         }else{
            seterror({...error,maritalstatus:false})
         }


        if(!user.caste){
            formIsValid = false;
            seterror({...error,caste:true})
         }else{
            seterror({...error,caste:false})
         }
            
         
         if(!user.address){
            formIsValid = false;
            seterror({...error,address:true})
         }else{
            seterror({...error,address:false})
         }
       return formIsValid;
   }

    const handleChange = (e,value) =>{
        console.log(value);
        if(value === "pmarital_status" ||  value === 'preligion'){
            if(e.target.value==="---Select Marital Status---" || e.target.value==="---Select Religion---"){
                setuser(prevState=> ({...prevState, preference : {...prevState.preference,[value] : "null"}}))
            }else{
                setuser(prevState=> ({...prevState, preference : {...prevState.preference,[value] : e.target.value}}))
            }
        }else{  
            setuser(prevState=> ({...prevState,[value] : e.target.value}))     
        }
        console.log(user)
    }

    const handledelete = () =>{
        console.log(user)
    }

    const getImage = (e) =>{
        var fReader = new FileReader();
        fReader.readAsDataURL(e.target.files[0])
        fReader.onloadend = (e) =>{
            setuser(prevState=> ({...prevState,["image"] : e.target.result}))
        }
        console.log(user)
    }

    return (
        <div className='editform'>
            <form className='editform-container' onSubmit={handleRegistration}>
                <div className='editform-field-row signup-email'>
                    <fieldset className='hiddenfield'>
                        <legend>Email</legend>
                        <input type="text" size="30" value={user.email} placeholder="Enter Email" onChange={(e)=>handleChange(e,"email")} readonly='readonly' ></input>
                    </fieldset> 
                    <fieldset className='hiddenfield'>
                        <legend>Password</legend>
                        <input type="password" size="30" value={user.password} placeholder="Password should be 6 to 20 character" onChange={(e)=>handleChange(e,"password")} readOnly='readonly'></input>
                    </fieldset>
                </div>
                <div className='form-image'>
                        {user.image==null ? <img src={man} /> : <img src={user.image} /> }
                        <div className='form-file'>
                            <input type="file" onChange={(e)=>getImage(e)}/>
                        </div>
                    </div> 
                <div className='editform-field-row editform-name'> 
                    <fieldset>
                        <legend>First Name</legend>
                        <input type="text" size="30" value={user.fname} placeholder="First Name"  onChange={(e)=>handleChange(e,"fname")}></input>
                        <div className='error-icon'>{error.fname && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                    <fieldset>
                        <legend>Last Name</legend>
                        <input type="text" size="30" value={user.lname} placeholder="Last Name"  onChange={(e)=>handleChange(e,"lname")}></input>
                        <div className='error-icon'>{error.lname && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                    <fieldset>
                        <legend>Date of Birth</legend>
                        <input type="date" value={user.dob} onChange={(e)=>handleChange(e,"dob")}></input>
                        <div className='error-icon'>{error.dob && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                </div>
                <div className='editform-field-row editform-details1'>
                    <fieldset>
                        <legend>Religion</legend>
                        <select value={user.religion} onChange={(e)=>handleChange(e,"religion")}>
                            <option>Select Religion</option>
                            <option>Hinduism</option>
                            <option>Islam</option>
                            <option>Christianity</option>
                            <option>Sikhism</option>
                            <option>Buddhism</option>
                            <option>Jainism</option>
                        </select>
                        <div className='error-icon'>{error.religion && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                {/* </div>
                <div className='editform-field-row editform-details2'> */}
                <fieldset>
                    <legend>Mother Tongue</legend>
                    <input type="text" size="30" value={user.mother_tongue} placeholder="Mother Tongue" onChange={(e)=>handleChange(e,"mother_tongue")}></input>
                    <div className='error-icon'>{error.mother_tongue && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                <fieldset>
                    <legend>City</legend>
                    <input type="text" size="30" value={user.city} placeholder="city" onChange={(e)=>handleChange(e,"city")}></input>
                    <div className='error-icon'>{error.city && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                </div>
                <div className='editform-field-row editform-gender'>
                    <fieldset>
                        <legend>Gender</legend>
                        <select value={user.gender} onChange={(e)=>handleChange(e,"gender")}>
                            <option selected disabled hidden value={null}>---Select Option---</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <div className='error-icon'>{error.gender && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                <fieldset>
                <legend>Mobile Number</legend>
                    <input type="number" size="10" value={user.mobileno} placeholder="Mobile Number" onChange={(e)=>handleChange(e,"mobileno")}></input>
                    <div className='error-icon'>{error.mobileno && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                {/* </div>
                <div className='editform-field-row'> */}
                 <fieldset>
                        <legend>Marital Status</legend>
                        <select value={user.maritalstatus} onChange={(e)=>handleChange(e,"maritalstatus")}>
                            <option selected disabled hidden>---select option---</option>
                            <option>Unmarried</option>
                            <option>Divorced</option>
                        </select>
                        <div className='error-icon'>{error.maritalstatus && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                </div>
                <div className='editform-field-row address'>
                    <fieldset>
                        <legend>Caste</legend>
                        <input type="text" size="20" value={user.caste} placeholder="caste" onChange={(e)=>handleChange(e,"caste")}></input>
                        <div className='error-icon'>{error.caste && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>

                    <fieldset>
                        <legend>Address</legend>
                        <textarea type="text" size="250" value={user.address} placeholder='address' onChange={(e)=>handleChange(e,"address")} />
                        <div className='error-icon'>{error.address && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                </div>
                <div className='editform-field-row'> 
                <fieldset>
                        <legend>Preference Marital Status</legend>
                        <select value={user.preference!=null ? user.preference.pmarital_status != null ? user.preference.pmarital_status : "" : ""} onChange={(e)=>handleChange(e,"pmarital_status")}>
                            <option selected value={null}>---Select Marital Status---</option>
                            <option value="Unmarried">Unmarried</option>
                            <option value="Divorced">Divorced</option> 
                        </select>
                    </fieldset> 
                <fieldset>
                        <legend>Preference Religion</legend>
                        <select value={user.preference!=null ? user.preference.preligion != null ? user.preference.preligion : "" : ""} onChange={(e)=>handleChange(e,"preligion")}>
                            <option selected value={null}>---Select Religion---</option>
                            <option>Hinduism</option>
                            <option>Islam</option>
                            <option>Christianity</option>
                            <option>Sikhism</option>
                            <option>Buddhism</option>
                            <option>Jainism</option>
                        </select>
                    </fieldset> 
                </div> 
                <div className='editform-button'>
                    <input type='submit' value='Update Profile' onSubmit={handleRegistration}/>
                </div>
            </form> 
        </div>
        )
    }
export default Editprofile1
