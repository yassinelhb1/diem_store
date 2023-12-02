import axios from 'axios';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailRestAPI = ({totalPrice,userName}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const data = {
      service_id: "service_51erqjl",
      template_id: "template_94ucrba",
      user_id: "2aE16zJbhZLCxymLk",
      template_params: {
        from_name: name,
        from_email: email,
        to_name: userName,
        message:totalPrice,
      }
    };


    try {
      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log(res.data);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <form className="form-group" autoComplete="off" onSubmit={handleSubmit}  noValidate>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Your Name
          </label>
          <input
            type='text'
            className="form-group"
            id='name'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className='invalid-feedback'>Please enter your name.</div>
        </div>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Your Email
          </label>
          <input
            type='email'
            className="form-group"
            id='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='invalid-feedback'>Please enter a valid email address.</div>
        </div>

         <button type='submit' className='btn btn-primary'>
          Payer
        </button> 
      </form>
    </div>
  );
}

export default EmailRestAPI;