import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Headset,
  User,
  Tag,
  MessageSquare,
  Send,
  Award,
  Palette,
  Handshake,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "../styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your backend contact API here.
    console.log(form);
    alert("Thank you! Your message has been submitted.");

    setForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactDetails = [
    {
      icon: <Phone />,
      title: "+91 98946 62020",
      description: "Mon – Sat : 9:00 AM – 8:30 PM",
      link: "tel:+919894662020",
      isExternal: true,
    },
    {
      icon: <Mail />,
      title: "info@srithillaitraders.com",
      description: "We reply within 24 hours",
      link: "mailto:info@srithillaitraders.com",
      isExternal: true,
    },
    {
      icon: <MapPin />,
      title: "24, Thillai Traders, A.R.D.C.",
      description: "Sengunthapuram, Puducherry – 605001",
      link: "https://www.google.com/maps?q=11.936052,79.832962(Sri+Thillai+Traders+Puducherry)",
      isExternal: true,
      target: "_blank",
    },
    {
      icon: <Headset />,
      title: "Live Support",
      description: "Available on our website",
      action: () => {
        const formEl = document.getElementById("contact-form");
        if (formEl) {
          formEl.scrollIntoView({ behavior: "smooth", block: "start" });
          const nameInput = document.querySelector("#contact-form input[name='name']");
          if (nameInput) nameInput.focus();
        }
      },
    },
  ];

  const benefits = [
    {
      icon: <Award />,
      title: "Premium Quality Paints",
      description: "Only the best for your home",
    },
    {
      icon: <Palette />,
      title: "Wide Range of Colours",
      description: "Express your style",
    },
    {
      icon: <Handshake />,
      title: "Customer Support",
      description: "Always here to help",
    },
    {
      icon: <ShieldCheck />,
      title: "Trusted Brand",
      description: "Your trust, our pride",
    },
  ];

  return (
    <main className="contact-page">

      {/* SECTION HEADER */}
      <section className="contact-header-section">
        <div className="contact-header-container">
          <div className="contact-pill-badge">
            <span className="contact-pill-star">✦</span>
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="contact-header-title">
            Connect With Our Paint Experts
          </h1>
          <p className="contact-header-subtitle">
            Visit our store, give us a call, or send us a message — we are here to help you choose the perfect colours.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS + FORM */}
      <section className="contact-main">

        {/* LEFT CONTACT DETAILS */}
        <div className="contact-details-card">

          <div className="contact-info">

            <span className="contact-label">
              Our Contact Details
            </span>

            {contactDetails.map((item, index) => {
              const content = (
                <>
                  <div className="contact-icon">
                    {item.icon}
                  </div>

                  <div className="contact-detail-text">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </>
              );

              if (item.link) {
                return (
                  <a
                    href={item.link}
                    key={index}
                    className="contact-detail-item clickable"
                    target={item.target || undefined}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={index}
                  className="contact-detail-item clickable"
                  onClick={item.action}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      item.action && item.action();
                    }
                  }}
                >
                  {content}
                </div>
              );
            })}

          </div>

          {/* GOOGLE MAP */}
          <div className="contact-map">
            <iframe
              title="Sri Thillai Traders Location"
              src="https://www.google.com/maps?q=Puducherry&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

        </div>

        {/* RIGHT CONTACT FORM */}
        <div className="contact-form-card" id="contact-form">

          <div className="contact-form-content">

            <span className="contact-label">
              Send Us a Message
            </span>

            <h2>
              We’re Here to <span>Help</span>
            </h2>

            <p className="contact-form-description">
              Fill out the form below and we’ll get back
              to you shortly.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="contact-form-row">

                <div className="contact-input">
                  <User />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-input">
                  <Mail />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email *"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="contact-input">
                <Tag />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject *"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-input contact-message">
                <MessageSquare />
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>
          </div>

        </div>

      </section>

    </main>
  );
};

export default Contact;
