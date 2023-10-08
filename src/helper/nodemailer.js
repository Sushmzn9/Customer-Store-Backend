import nodemailer from "nodemailer";

export const accountVerificationEmail = async (obj) => {
  const { email, fName, link } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Account activation required", // Subject line
    text: `hello ${fName}, please follow the link to activate your account. ${link}`, // plain text body
    html: `
      <p>
      Hello ${fName}
  </p>
  <p>
  please follow the link below to activate your account.
  </p>
  <br />
  <br />
  <p>
     <a href=${link}>  ${link} </a>
  </p>
  <br />
  <br />
  
  <p>
      Regareds, <br />
      EST Store <br />
      Customer Support Team
  </p>
      
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export const accountVerifiedNotification = async (obj) => {
  const { email, fName } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Account has been verified", // Subject line
    text: `hello ${fName}, Your account has been verified, you may sign in now`, // plain text body
    html: `
      <p>
      Hello ${fName}
  </p>
  <p>
  Your account has been verified, you may 
  <a href="${process.env.WEB_DOMAIN}">
  sign
  </a>
  in now
  </p>
  <br />
  <br />
   
  
  <p>
      Regareds, <br />
      EST Store <br />
      Customer Support Team
  </p>
      
      `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export const bookingConfirmEmail = async (obj) => {
  const { email, name, date, repairType, time } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Booked Reserved", // Subject line
    text: `hello ${name},`, // plain text body
    html: `
  <p>Hello ${name},</p>

  <p>Your booking has been successfully reserved!</p>

  <p>Booking Details:</p>
  <ul>
    <li><strong>Repair Type:</strong> ${repairType}</li>
    <li><strong>Date:</strong> ${date}</li>
    <li><strong>Time Slot:</strong> ${time}</li>
  </ul>

  <p>We look forward to serving you on the selected date and time.</p>

  <p>Thank you for choosing our tech repair services.</p>

  <p>Best Regards,<br />EST Store</p>
`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
