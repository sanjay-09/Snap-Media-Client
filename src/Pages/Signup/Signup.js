import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import "./Signup.scss"
import { axiosClient } from '../../utils/axiosClient';

function Signup() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState(''); 
    const [name,setName]=useState('');
    async  function handleSubmit(e){
        console.log(email);
        console.log(password);
        e.preventDefault();
        try{
        const response= await axiosClient.post('/auth/signup',{
            name:name,
            email:email,
            password:password
        })
        console.log(response);
        
        
    }
    catch(error){
        console.log(error);
    }
        
    }
    return (
        <div className="SignUp">
            <div className="SignUp-box">
            <h2 className="heading">SignUp</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
                <input type="text" className="Name" id="Name" onChange={(e)=>{setName(e.target.value)}} />

                <label htmlFor="email">Email</label>
                <input type="text" className="email" id="email" onChange={(e)=>{setEmail(e.target.value)}} />
    
                <label htmlFor="password">Password</label>
                <input type="password" className="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} />
    
                
                <input type="submit" className="Submit" onClick={handleSubmit}/>
            </form>
            <p className='Login-button'>Already a User? <Link to="/login">Login</Link></p>
            </div>
           
        </div>
      )
  
}

export default Signup
