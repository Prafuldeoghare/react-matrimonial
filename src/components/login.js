import React, {useState} from 'react'
import {FaHandHoldingHeart,FaExclamationCircle} from 'react-icons/fa'
import './login.css'
import { useHistory } from 'react-router'
import Modal from 'react-modal'
import { useSelector, useDispatch } from 'react-redux'
import Forgetpassword from './forgetpassword'
export default function Login() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState({email: false ,password: false});
    const [emailError, setEmailError]=useState("");
    const admin = useSelector(state => state.adminlogin.admin);
    const forgetpass = useSelector(state => state.fpassword.forgetpass)
    
    const handleEmailChange = ({ target }) => {
      setShowError(prevState =>({...prevState, email:false}));
      setEmail(target.value);
    };

    const handlePasswordChange = ({ target }) => {
        setShowError(prevState =>({...prevState, password:false}));
        setPassword(target.value);
    };

    const loginSubmitHandler = (event) =>{
        event.preventDefault();
        if(email===''){
            setShowError(prevState=>({...prevState,email:true}))
            setEmailError('Enter Email Error')
            if(password===""){
                setShowError(prevState=>({...prevState,password:true}))
            }
        }else if(email!=='' && password===""){
            setShowError(prevState=>({...prevState,password:true}))
        }else{
            const validation = validate(email);
            if(validation){
                fetch('http://localhost:8080/login',{
                method:'POST',
                body:JSON.stringify({
                    username: email,
                    password: password,
                }),
                headers: {
                    'Content-Type':'application/json'
                } 
            }).then(res =>{
                if(res.ok){
                    res.json().then(data =>{
                        history.push('/user')
                        dispatch({type:'authuser',payload: data})
                    })                    
                }else{
                    return res.json().then( data =>{
                        let response = data.message
                        throw response
                    })
                }
            }).catch(
                (error)=>{
                    dispatch({type:'messages',payload: error})
                    setPassword("")
                    setShowError(prevState=>({...prevState, password: true}))
                }
            )
            }
            else{
                emptyfield()
                dispatch({type:'messages',payload: 'Invalid Email'})
            }
        }
    }

    const emptyfield = () =>{
        setEmail('')
        setPassword('')
    }

    const adminSubmitHandler = (event) =>{
        event.preventDefault();
        if(email===""){
            setShowError(prevState=>({...prevState,email:true}))
            setEmailError('Enter Email Error')
            if(password===""){
                setShowError(prevState=>({...prevState,password:true}))
            }
        }else{
            if(email==='admin@weddingbells.com' && password==='admin'){
                history.push('/admin')
                dispatch({type:'authadmin'})
            }else{
                dispatch({type:'messages',payload: 'Invalid Email Id and Password'})
                setPassword("")
            }
        }
    }

    const validate=(email)=>{
        const checkemail = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
        if(checkemail == false){
            setShowError(prevState=>({...prevState,email:true}))
        }
        return checkemail
    }

    return (
        <div className='login-form'>
            <div className='login-form-title'>
                <div className='login-icon'><FaHandHoldingHeart /></div>
            </div>
            <form onSubmit={admin ? adminSubmitHandler : loginSubmitHandler}>
                {admin ? <span>Admin</span> : <span>Login and find your soulmate</span> }
                <div className='login-form-email'>
                <fieldset>
                    <legend>Email</legend>
                    <input placeholder='Eg: xyz@gmail.com' value={email} 
                        onChange={handleEmailChange}
                    ></input><div className='error-icon'>{showError.email && <FaExclamationCircle style={{fontSize:'1.2rem',color:'#ff4f80'}}/>}</div>
                </fieldset>
                </div>
                <div className='login-form-password'>
                <fieldset>
                    <legend>Password</legend>
                    <input placeholder='Must have atleast 8 characters' type='password' value={password} 
                    onChange={handlePasswordChange}
                ></input><div className='error-icon'>{showError.password && <FaExclamationCircle style={{fontSize:'1.2rem',color:'#ff4f80'}}/>}</div>
                </fieldset>
                </div>
                <div className='login-form-login'>
                    {admin ? <button onSubmit={adminSubmitHandler}>Admin login</button> : <button onSubmit={loginSubmitHandler}>Login</button>}
                </div>  
            </form>
            <div className="loginform-button">
                {admin?  null : <button onClick={()=>{dispatch({type:'togglefpassword'})}}>forgot password ?</button>}
            </div>
            <Modal isOpen={forgetpass} 
             style={
                 {
                     overlay: {
                         background: 'rgba(0,0,0,0.5)',
                        },
                    content: {
                        color: 'lightsteelblue',
                        padding: '0px',
                        top: '25%',
                        left: '35%',
                        right: '35%',
                        bottom: '25%',
                        textAlign:'center'
                    }
                 }
             }
            >
            <Forgetpassword />
            </Modal>
        </div>
    )
}



