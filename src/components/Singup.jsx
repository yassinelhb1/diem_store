import {React,useState} from "react";
import { Link } from "react-router-dom"
import { auth,fs } from "../configuration/config"
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Singup =()=> {

    const navigate =useNavigate();

    const [fullName, setFullName]  = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errormsg,setErrormsg]= useState('');
    const [successmsg,setSuccessmsg]= useState('');

    const handlesignup=(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((Credentials)=>
           {console.log(Credentials);
            fs.collection('users').doc(Credentials.user.uid).set({
                FullName:fullName,
                Email:email,
                Password:password

            }).then(()=>{
                setSuccessmsg('signup successful.You will now automatically get  redirected to Login');
                setFullName('');
                setEmail('');
                setPassword('');
                setErrormsg('');
                setTimeout(() => {
                    setSuccessmsg('');
                    navigate('/login');
                    
                },3000);


            }).catch(error=>setErrormsg(error.message));
        
        }).catch((error)=>
                {setErrormsg(error.message)})

    }

        return(
            
        <div className="container">
            
           <br></br>
           <br></br>
           <h1>Sing Up</h1>
           <hr></hr>
           {successmsg&&<>
           <div className="success-msg">{successmsg}</div></>}
           <form className="form-group" autoComplete="off" onSubmit={handlesignup}>
            <label>Full Name</label>
            <input type="text" className="form-group" required onChange={(e)=>setFullName(e.target.value)} value={fullName}></input>
            <br></br>
            <label>Email</label>
            <input type="email" className="form-group" required onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <br></br>
            <label>Password</label>
            <input type="password" className="form-group" required onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <br></br>
            <div className="btn-box">
                <span>Already have an account Login</span>
                <Link to="/login" className="Link">Here</Link>
                <button type="submit" className="btn btn-succes btn-md">Sign Up</button>
            </div>

           </form>
           {errormsg&&<>
           <br></br>
           <div className="error-msg">{errormsg}</div></>}
        </div>
    )
}