import React from "react";
import { useState } from "react";
import API from "../services/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/contacts", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input 
          id="name"
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Your Name" 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="your.email@example.com" 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea 
          id="message"
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          placeholder="Your message here..." 
          required 
        />
      </div>
      
      <button type="submit">Send Message</button>
      
      {status === "success" && (
        <p className="status-message success">Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="status-message error">Error sending message. Please try again.</p>
      )}
    </form>
  );
}