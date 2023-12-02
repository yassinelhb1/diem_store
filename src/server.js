const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3001;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lahbibyassine2018@gmail.com',
    pass: 'yassine123'
  }
});

app.post('/send-email', (req, res) => {
  const mailOptions = {
    from: 'lahbibyassine2018@gmail.com',
    to: 'lahbibyassine2018@gmail.com',
    subject: 'Subject',
    text: 'Email content'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
