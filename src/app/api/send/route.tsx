
// import { Resend } from "resend";

// console.log(process.env.RESEND_API_KEY)
// const resend = new Resend(process.env.RESEND_API_KEY);


// export const sendEmail = async (formData: FormData) =>{
//   const senderEmail = formData.get("senderEmail");
//   const message = formData.get("message");
//   const subject = formData.get("subject");
//   if (!message || typeof message !== 'string') {
//     return{
//       error: "Invalid Message",
//     }
//   }

//   await resend.emails.send({
//     from: senderEmail as string,
//     to: ["ayounathan05@gmail.com"],
//     subject: subject as string,
//     reply_to: senderEmail as string,
//     text: message
//   })

// }



import { Resend } from "resend";

// Ensure the API key is logged correctly
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");
  const subject = formData.get("subject");

  // Validate message and senderEmail
  if (!message || typeof message !== 'string' || !senderEmail || typeof senderEmail !== 'string') {
    return {
      error: "Invalid input data",
    };
  }

  try {
    await resend.emails.send({
      from: senderEmail,
      to: ["ayounathan05@gmail.com"],
      subject: subject as string,
      reply_to: senderEmail,
      text: message,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return { error: "Failed to send email due to server error." };
  }
}



// const resend = new Resend('re_56QvpZWC_NvHV5zjWncqtdLyiHeqSXyLy');

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'ayounathan05@gmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });

// // // Need to get working