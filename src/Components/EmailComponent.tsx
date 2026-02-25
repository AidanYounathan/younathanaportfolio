'use client'
import React, { useState, useRef } from 'react'
import GithubIcon from "../../public/github-icon.svg";
import LinkedinIcon from "../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";



// Default to your formspree id if env var isn't set so the form will post to your endpoint immediately.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mjgelvnb';
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const DISABLE_RECAPTCHA = process.env.NEXT_PUBLIC_DISABLE_RECAPTCHA === 'true';

const EmailComponent = () => {
    
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

    // Dynamically load Google reCAPTCHA v3 script
    const loadReCaptcha = (siteKey: string) => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window === 'undefined') return reject(new Error('No window'));
        const w = window as any;
        if (w.grecaptcha && w.grecaptcha.execute) return resolve();
        const existing = document.querySelector(`script[src*="google.com/recaptcha"]`);
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error('reCAPTCHA script failed to load')));
          return;
        }
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('reCAPTCHA script failed to load'));
        document.head.appendChild(script);
      });
    };

  const badgeContainerRef = useRef<HTMLDivElement | null>(null);
  const [recaptchaStatus, setRecaptchaStatus] = useState<'idle'|'loading'|'success'|'failed'|'disabled'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

    // Move grecaptcha badge into our container so it appears under the button
    const moveRecaptchaBadge = () => {
      try {
        const badge = document.querySelector('.grecaptcha-badge') as HTMLElement | null;
        const container = badgeContainerRef.current;
        if (badge && container && !container.contains(badge)) {
          // Reset badge positioning so it sits naturally in the container
          badge.style.position = 'static';
          badge.style.transform = 'none';
          badge.style.marginTop = '8px';
          badge.style.boxShadow = 'none';
          badge.style.width = '100%';
            // Ensure the badge is visible (sometimes reCAPTCHA sets inline styles to hide it)
            badge.style.display = 'block';
            badge.style.visibility = 'visible';
            badge.style.opacity = '1';
          // Remove inline right/bottom styles if present
          badge.style.right = '';
          badge.style.bottom = '';
          container.appendChild(badge);
        }
      } catch (err) {
        // ignore
      }
    };

    // Public helper: explicitly acquire a reCAPTCHA token (can be triggered by a visible button)
    const acquireRecaptchaToken = async () => {
      if (!RECAPTCHA_SITE_KEY) return null;
      try {
        setRecaptchaStatus('loading');
        await loadReCaptcha(RECAPTCHA_SITE_KEY);
        moveRecaptchaBadge();
        const grecaptcha = (window as any).grecaptcha;
        if (!grecaptcha || !grecaptcha.ready) throw new Error('grecaptcha not available');
        const token: string = await new Promise((resolve, reject) => {
          try {
            grecaptcha.ready(() => {
              grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
                .then((t: string) => resolve(t))
                .catch((err: any) => reject(err));
            });
          } catch (err) {
            reject(err);
          }
        });
        moveRecaptchaBadge();
        setRecaptchaToken(token);
        setRecaptchaStatus('success');
        console.log('reCAPTCHA token (manual):', token);
        return token;
      } catch (err) {
        console.warn('reCAPTCHA acquisition failed', err);
        setRecaptchaStatus('failed');
        return null;
      }
    };

    

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
            setErrorMessage('');
            setIsSubmitting(true);
            try {
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              // Honeypot check: if a bot filled this hidden field, abort submission
              const honeypot = String(formData.get('hp_field') || '');
              if (honeypot.trim() !== '') {
                // treat as spam and silently fail
                setErrorMessage('Submission flagged as spam');
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

              // If reCAPTCHA is disabled locally, skip token acquisition
              if (DISABLE_RECAPTCHA) {
                setRecaptchaStatus('disabled');
              }

              // If reCAPTCHA site key is provided, load grecaptcha and get token (v3)
              if (RECAPTCHA_SITE_KEY && !DISABLE_RECAPTCHA) {
                try {
                  setRecaptchaStatus('loading');
                  await loadReCaptcha(RECAPTCHA_SITE_KEY);
                  // Move the badge into our UI container (if grecaptcha renders it)
                  moveRecaptchaBadge();
                  const grecaptcha = (window as any).grecaptcha;
                  if (!grecaptcha || !grecaptcha.ready) {
                    throw new Error('grecaptcha not available');
                  }
                  // Use grecaptcha.ready to ensure proper initialization
                  const token: string = await new Promise((resolve, reject) => {
                    try {
                      grecaptcha.ready(() => {
                        grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact' })
                          .then((t: string) => resolve(t))
                          .catch((err: any) => reject(err));
                      });
                    } catch (err) {
                      reject(err);
                    }
                  });
                  // Move badge again in case it was created after execute
                  moveRecaptchaBadge();
                  // Formspree expects the token in the `g-recaptcha-response` field
                  (payload as any)['g-recaptcha-response'] = token;
                  setRecaptchaToken(token);
                  console.log('reCAPTCHA token:', token);
                  setRecaptchaStatus('success');
                } catch (recapErr) {
                  // If recaptcha fails, continue — Formspree may reject the submission depending on server config
                  console.warn('reCAPTCHA failed to load or execute', recapErr);
                  setRecaptchaStatus('failed');
                }
              }

              const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
              });

              const data = await res.json();
              if (!res.ok) {
                setErrorMessage(data?.error || 'Failed to send message');
              } else {
                setEmailSubmitted(true);
                (e.currentTarget as HTMLFormElement).reset();
              }
            } catch (err: any) {
              setErrorMessage(err?.message || 'Network error');
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
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-500 drop-shadow-lg hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg flex-1 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              <button
                type="button"
                onClick={async () => {
                  if (RECAPTCHA_SITE_KEY) {
                    await acquireRecaptchaToken();
                  } else {
                    // Helpful message for deployments where the NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set
                    setErrorMessage('reCAPTCHA is not configured on this deployment. Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your host environment and redeploy.');
                    setRecaptchaStatus('failed');
                  }
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center"
                aria-label="Verify reCAPTCHA"
              >
                {recaptchaStatus === 'loading' ? 'Verifying…' : (RECAPTCHA_SITE_KEY ? 'Verify reCAPTCHA' : 'Enable reCAPTCHA')}
              </button>
            </div>
            {/* Container where the reCAPTCHA badge will be moved so it appears under the button */}
            <div ref={badgeContainerRef} className="mt-2 flex justify-center" aria-hidden="true" />
            {/* Visual status for reCAPTCHA token acquisition */}
            <div className="mt-2 text-sm">
              {recaptchaStatus === 'loading' && <span className="text-[#ADB7BE]">Verifying reCAPTCHA...</span>}
              {recaptchaStatus === 'success' && <span className="text-green-400">reCAPTCHA verified</span>}
              {recaptchaStatus === 'failed' && <span className="text-red-400">reCAPTCHA failed — submission will still be attempted</span>}
              {recaptchaToken && process.env.NODE_ENV !== 'production' && (
                <div className="mt-2 break-all text-xs text-[#ADB7BE]">Token: {recaptchaToken}</div>
              )}
            </div>
          </form>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </section>
  )
}

export default EmailComponent
