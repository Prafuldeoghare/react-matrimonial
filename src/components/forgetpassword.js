import React,{useState} from 'react'
import { RiHeartsFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './foregtpassword.css'
function Forgetpassword() {
    const [user, setuser] = useState("")
    const [password ,setpassword] =useState("")
    const dispatch = useDispatch()
    const validation = () =>{
        let errors = {}
        let formIsValid = true;
        if(!user){
            formIsValid = false;
           errors["email"] = true;
        }

        if(!password){
            formIsValid = false;
           errors["email"] = true;
        }
        
        if(typeof user !== "undefined"){
           let lastAtPos = user.lastIndexOf('@');
           let lastDotPos = user.lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && user.indexOf('@@') == -1 && lastDotPos > 2 && (user.length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = true;
              alert('Inavlid Email')
            }
       }

       if(typeof password !== "undefined"){
            const re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const isOk = password.match(re);
            if(!isOk){
                formIsValid = false;
                errors["password"] = true;
                alert('Weak password!'+'\n'+'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte');
            }
        }

        return formIsValid;
    }

    const handlefpassword = async (e) =>{
        e.preventDefault()
        let valid = validation();
        if(valid){
            fetch(`http://localhost:8080/change_pwd?username=${user}&password=${password}`,{
                method:'POST',
            }).then(res => {
                dispatch({type:'togglefpassword'})
                dispatch({type:'messages',payload: 'Change Successful!!'})
                return res.json()
            }).then(data =>{
                console.log(data)
            })
        }
    }

    return (
        <div className='forgetpassword'>
            <div className='fp-title'>
                <span><RiHeartsFill className='nav-icons'/> Wedding Bells</span>
                <span>Change Password ?</span>
            </div>
            <div className='fp-container'>
                <form onSubmit={handlefpassword}>
                    <fieldset>
                        <legend>Email</legend>
                        <input placeholder='Eg: xyz@gmail.com' onChange={(e)=>setuser(e.target.value)}></input>
                    </fieldset>
                    <fieldset>
                        <legend>New Password</legend>
                        <input type="password" placeholder='Eg: xyz@gmail.com' onChange={(e)=>setpassword(e.target.value)}></input>
                    </fieldset>
                    <input type='submit' value='Change Password'/>
                </form>
            </div>
            <div className='fp-closebutton'>
                <button onClick={()=>{ dispatch({type:'togglefpassword'})}}>Close</button>
            </div>
        </div>
    )
}

export default Forgetpassword
