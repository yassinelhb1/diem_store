import axios from 'axios';
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const EmailRestAPI = ({totalPrice,userName}) => {

  const [email, setEmail] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const data = {
      service_id: "service_51erqjl",
      template_id: "template_94ucrba",
      user_id: "2aE16zJbhZLCxymLk",
      template_params: {
        total: totalPrice+" DT",
        from_email: email,
        to_name: userName,
       
      }
    };


    try {
      const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
      console.log(res.data);
      
      setEmail('');
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <form className="payment-form needs-validation" autoComplete="off" onSubmit={handleSubmit} noValidate>
  
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Adresse e-mail
          </label>
          <input
            type='email'
            className="form-control"
            id='email'
            placeholder='Votre adresse e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='invalid-feedback'>Veuillez saisir une adresse e-mail valide.</div>
        </div>
  
        <div className='mb-3'>
          <label htmlFor='cardNumber' className='form-label'>
            Numéro de carte de crédit
          </label>
          <input
            type='text'
            className="form-control"
            id='cardNumber'
            placeholder='---- ---- ---- ----'
            required
          />
        </div>
  
        <div className='row mb-3'>
          <div className='col-md-6'>
            <label htmlFor='expirationDate' className='form-label'>
              Date d'expiration
            </label>
            <input
              type='text'
              className="form-control"
              id='expirationDate'
              placeholder='MM/AA'
              required
            />
          </div>
          <div className='col-md-6'>
            <label htmlFor='cvv' className='form-label'>
              Code de sécurité (CVV)
            </label>
            <input
              type='text'
              className="form-control"
              id='cvv'
              placeholder='----'
              required
            />
          </div>
        </div>
  
        <button type='submit' className='btn btn-primary'>
          Payer
        </button>
      </form>
    </div>
  );
  
  
}

export default EmailRestAPI;