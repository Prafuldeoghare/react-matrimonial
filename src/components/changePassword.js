import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaExclamationCircle } from 'react-icons/fa'
import { useHistory } from 'react-router'
import './changePassword.css'
function ChangePassword() {
    const [user, setuser] = useState()
    const [password ,setpassword] =useState()
    const [rpassword ,setrpassword] =useState()
    const [error ,seterror] =useState(false)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(()=>{
        fetch('http://localhost:8080/profile',{
            method:'POST',
            headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
        }).then(res=>{
            return res.json()
        }).then(data=>{
            setuser(data.email)
        })
    },[])
    
    
    const validation = () =>{
        let formIsValid = true;

        if(!password){
            formIsValid = false;
        }
        
        if(typeof password !== "undefined"){
            let re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            let isOk = password.match(re);
            if(!isOk){
                formIsValid = false;
                alert('Weak password!'+'\n'+'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte');
            }
        }

        return formIsValid;
    }

    const handleCpassword = async (e) =>{
        e.preventDefault()
        let check = await handlecorrectp()
        console.log("json")
        if(check){
            fetch(`http://localhost:8080/change_pwd?username=${user}&password=${password}`,{
                method:'POST',
                headers:{ 'Content-Type' :'application/json', 'Authorization': `Bearer ${token}` }
            }).then(res => {
                console.log("push")
                return JSON.parse(JSON.stringify(res))
            }).then(data =>{
                console.log("push"+data)
                dispatch({type:'messages',payload: 'Change Successful!!'})
                setpassword('')
                history.push('/')
                console.log("push")
                dispatch({type: 'authuser', payload:''})
            })
        }
    }

    const handlecorrectp = async () =>{
        let formisvalid= false
        let valid = await validation();
        if(valid){
           if(rpassword === password){
               seterror(false)
               formisvalid=true
           }else{
             seterror(true)
             formisvalid=false
           }
        }
       return formisvalid
    }

    return (
        <div className='changepassword'>
            <div className='changep-container'>
                <div className='changep-fields'>
                    <form onSubmit={handleCpassword}>
                        <fieldset>
                            <legend>Email</legend>
                            <input type='text' value={user} onChange={(e)=>setuser(e.target.value)} readonly='readonly'></input>
                        </fieldset>
                        <fieldset>
                            <legend>New Password</legend>
                            <input type="password" onChange={(e)=>setpassword(e.target.value)}></input>
                        </fieldset>
                        <fieldset >
                            <legend>Retype New Password</legend>
                            <input type="password" onChange={
                                (e)=>{
                                    setrpassword(e.target.value)
                                    seterror(false)
                                }}></input>
                        </fieldset>
                        <div className='error-icon'>{error && <span style={{fontSize:'0.6rem',color:'red'}}>New Password and Retype Password did not match</span>}</div>
                        <input type='submit' value='Change Password'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
