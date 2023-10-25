import React, { useState } from "react";
import * as Yup from "yup";
import { useContactForm } from "../../Hooks/useSendContact";

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  text: Yup.string().required("Message is required"),
});

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  text: "",
  Timestamp: null,
  IP: null,
  UserAgent: null,
  Status: "New",
};

const ContactForm = () => {
  const [contact, setContact] = useState(INITIAL_STATE);
  const [contactStatus, handleContactForm] = useContactForm();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [formError, setFormError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate contact using Yup
      await validationSchema.validate(contact, { abortEarly: false });
      setLoading(true);
      const result = await handleContactForm(contact);
      setLoading(false);

      if (result.success) {
        setConfirmed(true);
      } else if (result.error) {
        setFormError(
          "An error occurred while sending your message. Please try again."
        );
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        setErrors(errorMessages);
      }
    }
  };

  if (loading) {
    return (
      <div className="contact-form ptb-100">
        <div className="contact-title">Loading...</div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="contact-form ptb-100">
        <div className="contact-title">
          Your message was successfully sent. We will get back to you soon!
        </div>
      </div>
    );
  }

  if (formError) {
    return (
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <p>{formError}</p>
          <button
            onClick={() => setFormError(null)}
            className="btn btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="contact-form ptb-100">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control-343a40"
                    value={contact.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control-343a40"
                    value={contact.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="form-control-343a40"
                    value={contact.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="form-group">
                  <textarea
                    name="text"
                    cols="30"
                    rows="6"
                    placeholder="Write your message..."
                    className="form-control-343a40"
                    value={contact.text}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-sm-12">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
