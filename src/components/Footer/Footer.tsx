//Footer.tsx
import React from 'react';
import igLogo from '../../assets/icons/instagram.png';
import fbLogo from '../../assets/icons/facebook.png';
import xLogo from '../../assets/icons/twitter.png';
import inLogo from '../../assets/icons/linkedin.png';
import ytLogo from '../../assets/icons/youtube.png';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-container-left']}>
                <div className={styles['footer-text-left']}>
                    <p>About Us</p>
                    <p>Customer Service</p>
                    <p>Pricacy Policy</p>
                    <p>Terms of Use</p>
                </div>

                <div className={styles['footer-text-right']}>
                    <p className="bold">Contact Us</p>
                    <p>Email: info@coffeepalace.com</p>
                    <p>Phone: 070 123 45 67</p>
                    <p>Andress: 12 Lorem Ipsum street, Stockholm</p>
                </div>
            </div>
            <div className={styles['footer-container-right']}>
                <a href="https://www.instagram.com/">
                    <img src={igLogo} alt="Instagram logo" />
                </a>
                <a href="https://www.facebook.com/">
                    <img src={fbLogo} alt="Facebook logo" />
                </a>
                <a href="https://twitter.com/">
                    <img src={xLogo} alt="Twitter logo" />
                </a>
                <a href="https://www.linkedin.com/">
                    <img src={inLogo} alt="LinkedIn logo" />
                </a>
                <a href="https://www.youtube.com/">
                    <img src={ytLogo} alt="YouTube logo" />
                </a>
            </div>
        </footer>
    );
};
export default Footer;
