const nodemailer = require("nodemailer");
const emailManager = async (to, text, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "95cedf4b4a8bbd",
      pass: "bd1646b6ce157a",
    },
  });
  await transport.sendMail({
    to: to,
    from: "info@expensetrackerpro.com",
    text: text,
    subject: subject,
  });
};

module.exports = emailManager;
