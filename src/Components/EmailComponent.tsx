'use client'
import React, { useState } from 'react'
import GithubIcon from "../../public/github-icon.svg";
import LinkedinIcon from "../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";



// Default to your formspree id if env var isn't set so the form will post to your endpoint immediately.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mjgelvnb';

const EmailComponent = () => {
    
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

      // Get data from the form
      // const formData = new FormData(e.currentTarget);
      // const senderEmail = formData.get('senderEmail');
      // const subject = formData.get('subject');
      // const message = formData.get('message');

      

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent rounded-full h-80 w-80 z-0 blur-2xl absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/AidanYounathan">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://www.linkedin.com/in/aidan-younathan/">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
        <p className='text-[#ADB7BE] mt-4 mb-4 max-w-md'><span className='font-bold'>Email:</span> Ayounathan05@gmail.com</p>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
        ) : (
          <form className="flex flex-col" onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            try {
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              // Honeypot check: if a bot filled this hidden field, abort submission
              const honeypot = String(formData.get('hp_field') || '');
              if (honeypot.trim() !== '') {
                // treat as spam and silently fail
                console.warn('Submission flagged as spam');
                setIsSubmitting(false);
                return;
              }
              const payload = {
                senderEmail: String(formData.get('senderEmail') || ''),
                subject: String(formData.get('subject') || ''),
                message: String(formData.get('message') || ''),
              };

              // If Formspree is configured, POST there. Otherwise fall back to local /api/contact
              let endpoint = '/api/contact';
              if (FORMSPREE_ID) {
                endpoint = `https://formspree.io/f/${FORMSPREE_ID}`;
              }

              // No reCAPTCHA: simplified path — Formspree will handle server-side checks if configured

              const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
              });

              const data = await res.json();
              if (!res.ok) {
                console.warn(data?.error || 'Failed to send message');
              } else {
                setEmailSubmitted(true);
                (e.currentTarget as HTMLFormElement).reset();
              }
            } catch (err: any) {
              console.error(err?.message || 'Network error');
            } finally {
              setIsSubmitting(false);
            }
          }}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="senderEmail"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>
            {/* Honeypot field to trap bots - keep hidden from users */}
            <input
              name="hp_field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-500 drop-shadow-lg hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg flex-1 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        )}
  {/* error messages intentionally hidden from UI; check server logs or console for details */}
      </div>
    </section>
  )
}

export default EmailComponent
