const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
// app.use(express.static('public'));

// POST endpoint to handle form submissions
app.post('/send-email', (req, res) => {
    const { fullname, email, message } = req.body;

    // Replace with your email configuration
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
            user: 'your_email@gmail.com', // Replace with your email
            pass: 'your_password' // Replace with your password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your_email@example.com', // Replace with your email
        subject: 'Message from Contact Form',
        text: `Name: ${fullname}\n\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Sorry, there was an error sending your message.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
