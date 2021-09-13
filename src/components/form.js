import React from 'react'
import './form.css'
import { GiDiamondRing} from 'react-icons/gi'
import { FaExclamationCircle } from 'react-icons/fa'
import { connect } from 'react-redux'
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            erroremailmessage:'',
            errorpasswordmessage:'' 
        }
        this.handleValidation = this.handleValidation.bind(this)
        this.handleclearfield =this.handleclearfield.bind(this)
    }

     
     handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        //Email 
        if(!fields["email"]){
            formIsValid = false;
           errors["email"] = true;
        }
        
        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = true;
              alert('Inavlid Email')
            }
       }

       if(typeof fields["password"] !== "undefined"){
            const re =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            const isOk = fields['password'].match(re);
            if(!isOk){
                formIsValid = false;
                errors["password"] = true;
                alert('Weak password!'+'\n'+'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special characte');
            }
        }



        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = true;
         }

         if(!fields["fname"]){
            formIsValid = false;
            errors["fname"] = true;
         }

         if(!fields["gender"]){
            formIsValid = false;
            errors["gender"] = true;
         }

         if(!fields["lname"]){
            formIsValid = false;
            errors["lname"] = true;
         }

        if(!fields["dob"]){
            formIsValid = false;
            errors["dob"] = true;
         }

         if(!fields["religious"]){
            formIsValid = false;
            errors["religious"] = true;
         }

         if(!fields["mothertongue"]){
            formIsValid = false;
            errors["mothertongue"] = true;
         }

         if(!fields["city"]){
            formIsValid = false;
            errors["city"] = true;
         }

         if(!fields["mobileno"]){
            formIsValid = false;
            errors["mobileno"] = true;
         }

         if(fields["mobileno"]){
            if(fields["mobileno"].length != 10){
                formIsValid = false;
                errors["mobileno"] = true;
            }
        }

         if(!fields["martialstatus"]){
            formIsValid = false;
            errors["martialstatus"] = true;
         }
  
       this.setState({errors: errors});
       return formIsValid;
   }


    handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

    async handleRegistration(e){
        e.preventDefault()
        let validate =await this.handleValidation()
        console.log(validate)
        console.log(this.state.errors)
        console.log( this.state.fields['email']+ ' ' +this.state.fields['password']+ this.state.fields['gender']+ ' '+this.state.fields['fname']+ ' '+this.state.fields['lname']+ ' '+this.state.fields['dob']+ ' '+this.state.fields['religious']+ ' '+this.state.fields['mothertongue']+ ' '+this.state.fields['city']+ ' '+this.state.fields['martialstatus']+ ' '+this.state.fields['mobileno']+ ' ')
        if(validate){
        e.preventDefault()
            fetch('http://localhost:8080/form',{
                method:'POST',
                body:JSON.stringify({
                    email: this.state.fields['email'],
                    password: this.state.fields['password'],
                    gender: this.state.fields['gender'],
                    fname: this.state.fields['fname'],
                    lname: this.state.fields['lname'],
                    dob: this.state.fields['dob'],
                    religion: this.state.fields['religious'],
                    mother_tongue: this.state.fields['mothertongue'],
                    city: this.state.fields['city'],
                    mobileno: this.state.fields['mobileno'],
                    maritalstatus: this.state.fields['martialstatus']
                }),
                headers: {
                    'Content-Type':'application/json'
                }
            }).then((res)=>{
                console.log("handleclearfiled"+res)
                if(res.ok){
                    this.handleclearfield()
                    console.log("changesignup"+res)
                    this.props.changesignup()      
                }
                return res.json()
            }).then((data)=>{
                console.log("data")
                    console.log(data)
                    let response = data.message
                    throw response
            }).catch(
                (error)=>{   
                    this.props.successfulsignup(error)
                }
            )
        }
    }

    handleclearfield(){
        this.setState({fields: {}})
    }

    render(){
        return (
        <div className='signup-form'>
            <div className='signup-form-title'>
                <span><GiDiamondRing className='nav-icons'/>Wedding Bells</span>
                <span>We bring together and love unite them</span>
            </div>
            <form className='signup-form-container' onSubmit={this.handleRegistration.bind(this)}>
                <div className='signup-field-row signup-email'>
                    <fieldset>
                        <legend>Email</legend>
                        <input ref="email" type="text" size="30" placeholder="Enter Email" onChange={this.handleChange.bind(this, "email")}></input>
                        <div className='error-icon'>{this.state.errors['email'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}} />}</div>
                    </fieldset>
                {/* </div>
                <div className='signup-field-row signup-password'> */}
                    <fieldset>
                        <legend>Password</legend>
                        <input refs="password" type="password" size="30" placeholder="Password should be 6 to 20 character" onChange={this.handleChange.bind(this, "password")} ></input>
                        <div className='error-icon'>{this.state.errors['password'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                    {/* <fieldset>
                        <legend>Confirm Password</legend>
                        <input type='password' placeholder='Enter you password to confirm' onChange={(e)=> setconfirmpassword(e.target.value)}></input>
                        <div className='error-icon'>{true && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset> */}
                </div>
                <div className='signup-field-row signup-name'>
                    <fieldset>
                        <legend>First Name</legend>
                        <input ref="fname" type="text" size="30" placeholder="First Name" onChange={this.handleChange.bind(this, "fname")}></input>
                        <div className='error-icon'>{this.state.errors['fname'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                    <fieldset>
                        <legend>Last Name</legend>
                        <input ref="lname" type="text" size="30" placeholder="Last Name" onChange={this.handleChange.bind(this, "lname")}></input>
                        <div className='error-icon'>{this.state.errors['lname'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                </div>
                <div className='signup-field-row signup-details1'>
                    <fieldset>
                        <legend>Date of Birth</legend>
                        <input ref="dob" type="date" onChange={this.handleChange.bind(this, "dob")}></input>
                        <div className='error-icon'>{this.state.errors['dob'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                    <fieldset>
                        <legend>Religion</legend>
                        <select ref="religions"  onChange={this.handleChange.bind(this, "religious")}>
                            <option selected disabled hidden>Select Religion</option>
                            <option>Hinduism</option>
                            <option>Islam</option>
                            <option>Christianity</option>
                            <option>Sikhism</option>
                            <option>Buddhism</option>
                            <option>Jainism</option>
                        </select>
                        <div className='error-icon'>{this.state.errors['religious'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                </div>
                <div className='signup-field-row signup-details2'>
                <fieldset>
                    <legend>Mother Tongue</legend>
                    <input ref="mothertongue" type="text" size="30" placeholder="Mother Tongue" onChange={this.handleChange.bind(this, "mothertongue")}></input>
                    <div className='error-icon'>{this.state.errors['mothertongue'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                <fieldset>
                    <legend>City</legend>
                    <input ref="city" type="text" size="30" placeholder="city" onChange={this.handleChange.bind(this, "city")}></input>
                    <div className='error-icon'>{this.state.errors['city'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                </div>
                <div className='signup-field-row signup-gender'>
                <fieldset>
                    <legend>Gender</legend>
                    <select ref="gender"  value={this.state.fields["gender"]} onChange={this.handleChange.bind(this, "gender")}>
                        <option selected disabled hidden>---select option---</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                    <div className='error-icon'>{this.state.errors['gender'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                <fieldset>
                <legend>Mobile Number</legend>
                    <input ref="mobileno" type="number" size="10" max="9999999999"  placeholder="Mobile Number" onChange={this.handleChange.bind(this, "mobileno")}></input>
                    <div className='error-icon'>{this.state.errors['mobileno'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                </fieldset>
                </div>
                <div className='signup-field-row'>
                    <fieldset>
                        <legend>Marital Status</legend>
                        <select ref="martialstatus"  onChange={this.handleChange.bind(this, "martialstatus")}>
                        <option selected disabled hidden>---select option---</option>
                        <option>Unmarried</option>
                        <option>Divorced</option>
                    </select>
                        <div className='error-icon'>{this.state.errors['martialstatus'] && <FaExclamationCircle style={{fontSize:'1.2rem',color:'red'}}/>}</div>
                    </fieldset>
                </div>
                <div className='signup-form-button'>
                    <input type='submit' value='Register' onSubmit={this.handleRegistration.bind(this)}/>
                    <input type='button' value='Close' onClick={()=>{this.props.closesignup()}}/>
                </div>  
            </form>
        </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return{
        closesignup: ()=>dispatch({type: 'changesignup'}),
        changesignup: ()=> dispatch({type: 'changesignup'}),
        successfulsignup: (error)=>dispatch({type:'messages',payload: error })
    }
}

export default connect(null,mapDispatchToProps)(Form)
