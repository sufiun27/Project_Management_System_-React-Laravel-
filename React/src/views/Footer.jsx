import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; {currentYear} All rights reserved. Created by <strong>Abu Sufiun</strong>
      </p>
      <p style={styles.text}>
        Contact: <a href="mailto:abusufiun27@gmail.com" style={styles.link}>abusufiun27@gmail.com</a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    color: '#333',
    marginTop: '20px',
    borderTop: '1px solid #ddd',
  },
  text: {
    margin: '5px 0',
    fontSize: '14px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default Footer;
