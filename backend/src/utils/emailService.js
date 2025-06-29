import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"MediCore" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'MediCore Password Reset OTP',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendOTPEmail;
