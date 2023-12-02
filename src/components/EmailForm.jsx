import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';


const EmailForm = ({totalPrice,userName}) => {

 
  const [email, setEmail] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();

   
  

    // Create a new object that contains dynamic template params
    const templateParams = {
      total: totalPrice+" DT",
      from_email: email,
      to_name: userName,
      
    };

    // Send the email using EmailJS
    emailjs.send("service_51erqjl", "template_94ucrba", templateParams, '2aE16zJbhZLCxymLk')
      .then((response) => {
        console.log('Email sent successfully!', response);
        
        setEmail('');
        
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  
}

export default EmailForm