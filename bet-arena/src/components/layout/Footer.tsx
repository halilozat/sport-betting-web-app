// src/components/layout/Footer.tsx

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>
          &copy; {currentYear} Bet Arena. Tüm hakları saklıdır. Bu proje eğitim
          amaçlı oluşturulmuştur.
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/halilozat"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/halil-%C3%B6zat-630b931a9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;