import React, { useState } from 'react';
import styles from './Contact.module.css'; // Import CSS module

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission, e.g., sending data to a server
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.contactInfo}>
        <p className={styles.description}>
          If you have any questions, feel free to reach out to us. We look forward to hearing from you!
        </p>
        <div className={styles.details}>
          <p><strong>Email:</strong> contact@hotel.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
          <p><strong>Address:</strong> 123 Hotel Lane, City, Country</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </label>
        <button type="submit" className={styles.submitButton}>Send Message</button>
      </form>

      <div className={styles.mapContainer}>
        <h2 className={styles.mapTitle}>Find Us Here</h2>
        <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.858074287053!2d-122.40552238468195!3d37.78201767975817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809b5b46d75f%3A0x94801333f8d54d5a!2sYour%20Hotel%20Name!5e0!3m2!1sen!2sus!4v1614779657567!5m2!1sen!2sus"
  width="100%"
  height="300"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  title="Google Maps Location of Your Hotel" // Add this line for accessibility
/>

      </div>
    </div>
  );
};

export default ContactPage;
