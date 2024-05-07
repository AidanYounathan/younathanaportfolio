// import { NextApiRequest } from "next";
// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);
// const fromEmail = process.env.FROM_EMAIL || 'default@example.com';

// export async function POST(req: NextApiRequest, res: NextApiRequest) {
  
  // console.log(email, subject, message);
//   try {
//     const { data, error } = await resend.emails.send({
//       from: fromEmail,
//       to: ['ayounathan05@gmail.com'],
//       subject: subject,
//       react: (
//         <>
//           <h1>{subject}</h1>
//           <p>Thank you for contacting us!</p>
//           <p>New message submitted:</p>
//           <p>{message}</p>
//         </>
//       ),
//     });
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json({ error });
//   }
  
// }

// Need to get working