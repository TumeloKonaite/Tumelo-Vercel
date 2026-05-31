import React, { useState } from "react";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const payload = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!payload.first_name || !payload.last_name || !payload.email || !payload.phone || !payload.message) {
      setStatus({
        type: "error",
        message: "Please complete the required fields before sending your inquiry.",
      });
      return;
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid contact email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "I could not send your message right now.");
      }

      setFormData(INITIAL_FORM_STATE);
      setStatus({
        type: "success",
        message: data.message || "Your message has been sent successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Network error. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-card">
      <div className="contact-form-header">
        <span className="contact-form-kicker">Direct contact</span>
        <h2>Start the conversation with the actual backend behind the site.</h2>
        <p>
          Share the problem, the team context, and the outcome you are targeting. I will receive it as an email
          through the backend contact route.
        </p>
      </div>

      <form className="contact-form-shell" onSubmit={handleSubmit}>
        <div className="contact-form-grid">
          <label className="contact-field">
            <span>
              First Name <strong className="contact-required-mark">*</strong>
            </span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-field">
            <span>
              Last Name <strong className="contact-required-mark">*</strong>
            </span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-field">
            <span>
              Contact Email <strong className="contact-required-mark">*</strong>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-field">
            <span>
              Contact Number <strong className="contact-required-mark">*</strong>
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label className="contact-field contact-field-full">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </label>

          <label className="contact-field contact-field-full">
            <span>
              Your Message <strong className="contact-required-mark">*</strong>
            </span>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me about the AI, data, or platform problem you are working on."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="contact-form-footer">
          <div className="contact-form-feedback" aria-live="polite">
            {status.type === "idle" ? (
              <p className="contact-form-note">Messages are sent through the same backend deployment pattern as the chatbot.</p>
            ) : (
              <p className={`contact-form-status contact-form-status-${status.type}`}>{status.message}</p>
            )}
          </div>

          <button type="submit" className="contact-submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
