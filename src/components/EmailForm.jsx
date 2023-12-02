import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';


const EmailForm = ({totalPrice,userName}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

   
  

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: userName,
      message:totalPrice,
    };

    // Send the email using EmailJS
    emailjs.send("service_51erqjl", "template_94ucrba", templateParams, '2aE16zJbhZLCxymLk')
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  return (
    <form className="form-group" autoComplete="off" onSubmit={handleSubmit} >
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <button type="submit">Payer</button>
    </form>
  )
}

export default EmailForm