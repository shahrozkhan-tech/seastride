// ==========================================================================
// SEASTRIDE ENGINEERING — Form submission via FormSubmit.co
// No backend, database, or API keys required — submissions are emailed
// straight to the inbox below using https://formsubmit.co (free service).
//
// SETUP (one-time, do this before sending the site to the client):
// 1. Change FORM_RECIPIENT_EMAIL below to the email that should receive
//    submissions.
// 2. Submit either form once on the live site. FormSubmit will send that
//    inbox a confirmation email — click "Activate Form" in it. After that,
//    every future submission is delivered automatically, no further setup.
// ==========================================================================

const FORM_RECIPIENT_EMAIL = 'azmatrehman69@gmail.com';

function wireFormSubmit(form, subject) {
  if (!form) return;
  const statusEl = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    fd.append('_subject', subject);
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: fd,
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      if (data.success === false || data.success === 'false') throw new Error('Submission failed');

      if (window.Swal) {
        Swal.fire({
          icon: 'success',
          title: 'Request Sent',
          text: 'Thank you — your request has been received. Our team will contact you shortly.',
          confirmButtonColor: '#1a86c9'
        });
      } else {
        showStatus(statusEl, 'ok', 'Thank you — your request has been received. Our team will contact you shortly.');
      }
      form.reset();
    } catch (err) {
      console.error(err);
      if (window.Swal) {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Something went wrong sending your request. Please try WhatsApp or email us directly.',
          confirmButtonColor: '#1a86c9'
        });
      } else {
        showStatus(statusEl, 'err', 'Something went wrong sending your request. Please try WhatsApp or email us directly.');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function showStatus(el, type, msg) {
  if (!el) return;
  el.textContent = msg;
  el.className = 'form-status show ' + type;
}

document.addEventListener('DOMContentLoaded', () => {
  wireFormSubmit(document.querySelector('#contact-form'), 'New Contact Message — Seastride Website');
  wireFormSubmit(document.querySelector('#quote-form'), 'New Inspection Request — Seastride Website');
});
