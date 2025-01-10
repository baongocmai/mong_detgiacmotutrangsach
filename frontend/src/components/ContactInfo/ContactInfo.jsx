import React, { useState } from "react";
import { FaFacebook, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";
import { MdOutlineMailOutline, MdPhoneAndroid, MdHome } from "react-icons/md";

const ContactInfo = () => {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in contact.socialLinks) {
      setContact({
        ...contact,
        socialLinks: { ...contact.socialLinks, [name]: value },
      });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Updating contact info...", contact);
      setMessage("Contact information updated successfully!");
    } catch (error) {
      setMessage("Error updating contact information.");
    }
  };

  return (
    <div className="contact-info" style={styles.container}>
      <h1>Contact Us</h1>
      <form className="contact-info-form" style={styles.form}>
        <div style={styles.column}>
          <h2>Contact Info</h2>
          <div>
            <MdOutlineMailOutline style={{ color: "grey" }} />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={contact.email}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div>
            <MdPhoneAndroid style={{ color: "purple" }} />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={contact.phone}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div>
            <MdHome style={{color:"brown"}} />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={contact.address}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </div>

        {/* Right Column */}
        <div style={styles.column}>
          <h2>Social Network</h2>
          <div>
            <FaFacebook style={{ color: "blue" }} />
            <input
              type="text"
              name="facebook"
              placeholder="Facebook"
              value={contact.socialLinks.facebook}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div>
            <FaTwitterSquare style={{ color: "#1DA1F2" }} />
            <input
              type="text"
              name="twitter"
              placeholder="Twitter"
              value={contact.socialLinks.twitter}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
          <div>
            <FaInstagramSquare style={{color: "pink"}} />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={contact.socialLinks.instagram}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </div>
      </form>
      <button
        type="button"
        onClick={handleSubmit}
        style={styles.button}
      >
        Update
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  

  input: {
    flex: 1,
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default ContactInfo;
