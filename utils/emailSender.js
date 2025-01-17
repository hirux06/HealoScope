import nodemailer from "nodemailer";

const sendEmail = async (to, subject, name, role) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: `
          <h1>Welcome to Our Platform, <i>${name}!</i></h1>
          <p>We're thrilled to have you onboard as a ${role}.</p><br>
          <p>If you have any questions, feel free to reach out to us.</p>
          <p>Best regards,</p>
          <p>Saran Hiruthik M</p>
          <p>Creator, HealoScope</p>
        `,
      };
      

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export default sendEmail;
