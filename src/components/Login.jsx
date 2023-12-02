import React, { useState }  from "react";
import { Link } from "react-router-dom";
import { auth } from "../configuration/config"
import {useNavigate} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export const Login= () => {
    const navigate=useNavigate();

    const [email,setEmail]=useState('');
    const [password,setPassword ]= useState('');

    const [errormsg,setErrormsg]= useState('');
    const [successmsg,setSuccessmsg]= useState('');

    const handlelogin=(e)=>{
        e.preventDefault();
       auth.signInWithEmailAndPassword(email,password).then(()=>{
        setSuccessmsg('Login successful.You will now automatically get  redirected to Home page')
                setEmail('');
                setPassword('');
                setErrormsg('');
                setTimeout(() => {
                    setSuccessmsg('');
                    navigate('/');
                },3000)
       }).catch(error=>setErrormsg(error.message));
    }
        

    return(
        <div className="container">
           <br></br>
           <br></br>
           <h1>Log In</h1>
           <hr></hr>
           {successmsg&&<>
           <div className="success-msg">{successmsg}</div></>}
           <form className="form-group" autoComplete="off" onSubmit={handlelogin}>
            <label>Email</label>
            <input type="email" className="form-group" required onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <br></br>
            <label>Password</label>
            <input type="password" className="form-group" required onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <br></br>
            <div className="btn-box">
                <span>Don't have an account Sing up</span>
                <Link to="/singup" className="Link"> Here</Link>
                <button type="submit" className="btn btn-succes btn-md">Log In</button>
            </div>

           </form>
           {errormsg&&<>
           <br></br>
           <div className="error-msg">{errormsg}</div></>}
        </div>
    )
}