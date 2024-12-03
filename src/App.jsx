import React, { useEffect, useState } from "react";
import { apiClient } from "./services/supabase";
import "./App.css"; // For styling

const HomePage = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlEmail, setUrlEmail] = useState("");

  // Extract email from URL and prepopulate the form
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
      setUrlEmail(email);

      registerInit(email);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function registerInit(email) {
    try {
      setLoading(true);
      setErrorMessage("");
      setStatusMessage("");
      const existing = await apiClient.isExistingEmail(email);
      if (existing) {
        setFormData((prev) => ({
          ...prev,
          email,
          reg_id: existing.reg_id,
          name: existing.full_name,
        }));
        setStatusMessage(
          `Your registration ID is "${existing.reg_id}". Please screenshot this and present it at the office reception before entering the event!`
        );
      }
      setLoading(false);
    } catch (error) {
      return;
    }
  }

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    try {
      if (!formData.name || !formData.email) {
        return;
      }

      setLoading(true);
      setStatusMessage("");
      setErrorMessage("");

      const response = await apiClient.register(
        formData.name.trim(),
        formData.email.trim()
      );
      setLoading(false);

      if (!response.error) {
        setStatusMessage(
          `Thank you! Your registration ID is "${response.data.reg_id}". Please screenshot this and present it at the office reception before entering the event!`
        );
        setFormData({ ...formData, name: response.data.full_name });
      } else {
        throw response.error;
      }
    } catch (error) {
      setStatusMessage("");
      setErrorMessage(`Could not RSVP. Please try again.`);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div style={{ color: "white", fontWeight: "bold", fontStyle: "italic" }}>
        Optimizely Presents:
      </div>
      <h1>Women in Tech</h1>
      <div style={{ color: "white", marginBottom: "20px" }}>
        Dec 8, Sunday 4:30 PM @ Optimizely Dhaka
      </div>
      <form onSubmit={handleSubmit} className="form">
        {!statusMessage && (
          <div>
            <h3 style={{ color: "#555" }}>
              Please RSVP to confirm your attendance!
            </h3>
            <p style={{ color: "#ba0505" }}>
              After you submit this form, you will be given a registration ID,
              which you will need to present at the office reception before
              entering the event.
            </p>
            <br />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Your Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            readOnly={statusMessage}
            className={statusMessage ? "disabled-input" : ""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly={statusMessage || urlEmail}
            className={statusMessage || urlEmail ? "disabled-input" : ""}
          />
        </div>
        <div style={{ marginTop: "20px" }}></div>

        {!statusMessage && (
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        )}

        {statusMessage && (
          <h2>
            <p className="status-message font-color-primary">{statusMessage}</p>
          </h2>
        )}
        {errorMessage && (
          <h4>
            <p className="status-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          </h4>
        )}
      </form>
    </div>
  );
};

export default HomePage;
