// ==========================================================================
// Shared header / footer / floating widgets — injected on every page
// ==========================================================================

const HEADER_HTML = `
<header class="site-header">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="images/logo_crop.png" alt="Seastride Engineering (SMC-Private) Limited logo">
      <span class="nav-logo-text">seastride engineering<span>(smc-private) limited</span></span>
    </a>
    <nav class="nav-links" id="navLinks">
      <a href="index.html" data-en="Home" data-ur="ہوم">Home</a>
      <a href="about.html" data-en="About" data-ur="تعارف">About</a>
      <a href="services.html" data-en="Services" data-ur="خدمات">Services</a>
      <a href="certificates.html" data-en="Certificates" data-ur="سرٹیفکیٹس">Certificates</a>
      <a href="blog.html" data-en="Insights" data-ur="بلاگ">Insights</a>
      <a href="clients.html" data-en="Clients" data-ur="کلائنٹس">Clients</a>
      <a href="contact.html" data-en="Contact" data-ur="رابطہ">Contact</a>
      <a href="quote.html" class="btn btn-primary nav-cta" data-en="Request Inspection" data-ur="انسپیکشن کی درخواست">Request Inspection</a>
      <div class="nav-lang">
        <button data-lang="en" class="active">EN</button>
        <button data-lang="ur">UR</button>
      </div>
    </nav>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-col">
        <div class="footer-logo">
          <img src="images/logo_crop.png" alt="Seastride Engineering (SMC-Private) Limited">
        </div>
        <p style="font-size:0.9rem;max-width:32ch;">General engineering, inspection, and marine maintenance services delivering reliable, safe, and efficient outcomes since 2020.</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="certificates.html">Certificates</a></li>
          <li><a href="blog.html">Insights</a></li>
          <li><a href="clients.html">Clients</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html#cleaning">Ship Cleaning</a></li>
          <li><a href="services.html#ndt">NDT Inspection</a></li>
          <li><a href="services.html#lifting">Load Test &amp; Lifting</a></li>
          <li><a href="services.html#calibration">Calibration</a></li>
          <li><a href="services.html#pipeline">Pipeline &amp; Cathodic</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:+923264400395">+92 326 4400395</a></li>
          <li><a href="tel:+923359042003">+92 335 9042003</a></li>
          <li><a href="mailto:azmatrehman69@gmail.com">azmatrehman69@gmail.com</a></li>
          <li style="color:var(--mist-200);font-size:0.9rem;">Room 301, BRR Tower, 14th Floor,<br>I.I. Chundrigar Road, Karachi 74000</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Seastride Engineering (SMC-Private) Limited. All rights reserved.</span>
      <span>Karachi, Pakistan</span>
    </div>
  </div>
</footer>

<div class="float-stack">
  <button class="to-top" aria-label="Back to top">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
  </button>
  <a class="wa-float" href="https://wa.me/923359042003?text=Hello%20Seastride%20Engineering%2C%20I%27d%20like%20to%20ask%20about%20your%20services." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 32 32"><path d="M16.001 3.2c-7.077 0-12.8 5.723-12.8 12.8 0 2.259.594 4.376 1.631 6.213L3.2 28.8l6.786-1.581a12.73 12.73 0 0 0 6.015 1.531h.005c7.077 0 12.8-5.723 12.8-12.8s-5.729-12.75-12.805-12.75zm7.494 18.088c-.319.894-1.581 1.638-2.581 1.85-.688.144-1.581.256-4.594-.988-3.856-1.6-6.338-5.525-6.531-5.781-.188-.256-1.575-2.094-1.575-3.994 0-1.9.994-2.831 1.35-3.219.319-.35.7-.438.938-.438.238 0 .475.006.681.013.219.007.513-.081.8.613.319.75 1.075 2.65 1.169 2.844.094.194.156.419.031.675-.125.256-.188.413-.375.638-.188.219-.394.488-.563.656-.188.188-.381.394-.163.769.219.375.969 1.6 2.081 2.594 1.431 1.275 2.638 1.669 3.013 1.856.375.188.594.156.813-.094.219-.256.938-1.094 1.188-1.469.25-.375.5-.313.844-.188.344.125 2.194 1.037 2.569 1.225.375.188.625.281.719.438.094.156.094.9-.219 1.8z"/></svg>
  </a>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.getElementById('site-header-mount');
  const footerMount = document.getElementById('site-footer-mount');
  if (headerMount) headerMount.outerHTML = HEADER_HTML;
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;
});
