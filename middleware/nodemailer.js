const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});
const sendMailToCustomer = async (email) => {
  try {
    let mailStatus = await transporter.sendMail({
      from: '"No reply @ Shopie" <shopieshop9@gmail.com>',
      to: email,
      subject: "Order Received",
      text: "We received your order successfully",
      html: "<p>We received your order successfully. It should arrive shortly, in a few business days.</p>",
    });

    console.log(`Message sent: ${mailStatus.messageId}`);
    return `Message sent: ${mailStatus.messageId}`;
  } catch (err) {
    console.log(err.message);
  }
};
const sendOrderMailToCustomer = async (email) => {
  try {
    let mailStatus = await transporter.sendMail({
      from: '"No reply @ Shopie" <shopieshop9@gmail.com>',
      to: email,
      subject: "Order Received",
      text: "Your Order Was Received",
      html: "<p>Your order was received, the shop will proccess your order shoryly.</p>",
    });

    console.log(`Message sent: ${mailStatus.messageId}`);
    return `Message sent: ${mailStatus.messageId}`;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  sendMailToCustomer,
  sendOrderMailToCustomer,
};
