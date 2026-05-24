"use client";

import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import sharedStyles from "./SharedStyles.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subjectType: "feedback",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Mapping subject type keys to human-friendly subject titles
    const subjectMap: Record<string, string> = {
      feedback: "General Feedback",
      bug: "Bug Report & Fixes",
      feature: "New Feature Request",
      support: "Support & Help",
    };

    const friendlySubject = subjectMap[formData.subjectType] || "Contact Form Submission";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "c43e7bac-683f-47fb-b4eb-0ffd6c754fa6",
          subject: `[SuperUtility] ${friendlySubject} from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
          subject_type: friendlySubject,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subjectType: "feedback",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Web3Forms submission failed:", err);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    }
  };

  return (
    <article className={styles.container} aria-label="SuperUtility Contact & Support Form">
      <div className={styles.titleSection}>
        <h1 className={styles.mainTitle}>Contact & Support</h1>
        <p className={styles.subtitle}>
          Have feedback, bugs to report, or feature requests? We would love to hear from you!
        </p>
      </div>

      <div className={styles.card}>
        {/* Core Guarantee Badge */}
        <div className={styles.badge} id="contact-guarantee-badge">
          <span className={styles.badgeDot}></span>
          <span>100% Free Support • Powered by Web3Forms</span>
        </div>

        {status === "success" ? (
          <div className={styles.successBlock} id="contact-success-block">
            <div className={styles.successIcon}>
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <h2 className={styles.successTitle}>Message Sent Successfully!</h2>
            <p className={styles.successText}>
              Thank you for reaching out. We have received your message and will get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className={sharedStyles.btnPrimary}
              style={{ marginTop: "12px", width: "fit-content", alignSelf: "center" }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} id="web3forms-contact-form">
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="name-input" className={styles.label}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className={styles.input}
                  required
                  disabled={status === "submitting"}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email-input" className={styles.label}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@example.com"
                  className={styles.input}
                  required
                  disabled={status === "submitting"}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="subject-type-select" className={styles.label}>
                What is this regarding?
              </label>
              <select
                id="subject-type-select"
                name="subjectType"
                value={formData.subjectType}
                onChange={handleInputChange}
                className={sharedStyles.select}
                required
                disabled={status === "submitting"}
              >
                <option value="feedback">General Feedback</option>
                <option value="bug">Bug Report &amp; Fixes</option>
                <option value="feature">Request New Feature</option>
                <option value="support">Support &amp; Help</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message-textarea" className={styles.label}>
                Your Message
              </label>
              <textarea
                id="message-textarea"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message details here..."
                className={styles.textarea}
                rows={6}
                required
                disabled={status === "submitting"}
              />
            </div>

            {status === "error" && (
              <div className={styles.errorBanner} id="contact-error-banner">
                <span><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", marginTop: "-2px" }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className={sharedStyles.btnPrimary}
              disabled={status === "submitting"}
              id="submit-contact-button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                marginTop: "8px"
              }}
            >
              {status === "submitting" ? (
                <>
                  <div className={styles.spinner}></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                  Submit Form
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </article>
  );
}
