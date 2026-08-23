import { useState, useRef } from 'react';
import Magnetic from './Magnetic';
import RollingText from './RollingText';

const fields = [
  {
    name: 'username',
    type: 'text',
    label: 'Name',
    placeholder: 'What should I call you?',
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Where do I reach back?',
  },
];

// Access key loaded from .env (VITE_WEB3FORMS_KEY)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const ContactRight = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(formRef.current);
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', `Portfolio Contact from ${formData.get('username')}`);
    formData.append('from_name', 'Pritamx4 Portfolio');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between pb-3">
        <div>
          <p className="font-ui text-[11px] font-medium hidden lg:block uppercase tracking-[0.35em] text-(--paper)/60">
            Reach Out
          </p>
          <h2 className="font-heading hidden lg:block mt-2 text-lg sm:text-xl font-semibold uppercase tracking-[0.15em] text-(--paper)">
            Say Hello
          </h2>
          <h2 className="font-heading lg:hidden mt-2 text-lg sm:text-xl font-semibold uppercase tracking-[0.15em] text-(--paper)">
            Say Hello
          </h2>
        </div>
      </div>

      {/* Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col text-(--paper)">
        {/* Honeypot anti-spam (hidden from users) */}
        <input type="checkbox" name="botcheck" className="hidden" />

        {/* Input fields */}
        {fields.map((f) => (
          <div
            key={f.name}
            className="group flex flex-col gap-1.5 border-b border-(--paper)/10 py-4 transition-all duration-300 lg:flex-row lg:items-center lg:gap-4 lg:py-3.5 lg:hover:bg-(--paper)/[0.02] lg:hover:pl-2"
          >
            <p className="font-heading text-xs uppercase tracking-[0.14em] text-(--paper)/70 lg:w-24 lg:shrink-0 font-medium">
              {f.label}
            </p>
            <input
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required
              disabled={status === 'sending'}
              className="font-body w-full bg-transparent text-sm tracking-wide text-(--paper) outline-none placeholder:text-(--paper)/35 focus:placeholder:text-(--paper)/20 transition-colors disabled:opacity-50"
            />
          </div>
        ))}

        {/* Message row */}
        <div className="group flex flex-col gap-1.5 border-b border-(--paper)/10 py-4 transition-all duration-300 lg:flex-row lg:items-start lg:gap-4 lg:py-3.5 lg:hover:bg-(--paper)/[0.02] lg:hover:pl-2">
          <p className="font-heading text-xs uppercase tracking-[0.14em] text-(--paper)/70 lg:w-24 lg:shrink-0 lg:pt-1 font-medium">
            Idea
          </p>
          <textarea
            name="message"
            placeholder="Tell me what's on your mind..."
            rows="2"
            required
            disabled={status === 'sending'}
            className="font-body w-full resize-none bg-transparent text-sm tracking-wide text-(--paper) outline-none placeholder:text-(--paper)/35 focus:placeholder:text-(--paper)/20 transition-colors disabled:opacity-50"
          />
        </div>

        {/* Submit button with Magnetic pull and RollingText flip */}
        <Magnetic strength={0.25} className="mt-6 w-full lg:w-fit">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="font-ui group flex w-full items-center justify-center gap-3 border border-(--paper)/30 bg-transparent px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium text-(--paper) transition-all duration-300 hover:border-(--paper) hover:bg-(--paper) hover:text-(--ink) hover:shadow-[0_0_30px_rgba(244,241,234,0.15)] active:scale-[0.97] cursor-pointer lg:w-fit lg:justify-start disabled:opacity-50 disabled:cursor-wait"
          >
            <RollingText
              text={
                status === 'sending'
                  ? 'Sending...'
                  : status === 'success'
                    ? '✓ Message Sent!'
                    : status === 'error'
                      ? '✕ Try Again'
                      : 'Send Message'
              }
            />
            <lord-icon
              className="current-color"
              src="https://cdn.lordicon.com/vpbspaec.json"
              trigger="hover"
              delay="1500"
              state="hover-flying"
              colors="primary:#f4f1ea"
              style={{ width: '24px', height: '24px' }}
            ></lord-icon>
          </button>
        </Magnetic>

        {/* Status feedback */}
        {status === 'success' && (
          <p className="font-ui mt-4 text-[11px] uppercase tracking-[0.25em] text-green-400/90 animate-pulse">
            ✓ Message delivered successfully — I'll get back to you soon!
          </p>
        )}
        {status === 'error' && (
          <p className="font-ui mt-4 text-[11px] uppercase tracking-[0.25em] text-red-400/90">
            ✕ Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactRight;
