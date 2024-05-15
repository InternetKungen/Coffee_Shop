//Footer.tsx
import React from 'react';
import igLogo from '../../assets/img/Instagram_logo.png';
import fbLogo from '../../assets/img/Facebook_Logo.png';
import xLogo from '../../assets/img/Twitter_logo.png';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles['footer-container-top']}>
                <div className={styles['footer-text']}>
                    <p>About Us</p>
                    <p>Customer Service</p>
                    <p>Pricacy Policy</p>
                    <p>Terms of Use</p>
                </div>

                <div className={styles['footer-text']}>
                    <p>Contact Us</p>
                    <p>Email: lorem@ipsum.com</p>
                    <p>Phone: 070 123 45 67</p>
                    <p>Andress: 12 Lorem Ipsum street, Stockholm</p>
                </div>
            </div>
            <div className={styles['footer-container-bottom']}>
                <div className={styles['footer-imgs']}>
                    <a href="https://www.instagram.com/">
                        <img src={igLogo} alt="Instagram logo" />
                    </a>
                    <a href="https://www.facebook.com/">
                        <img src={fbLogo} alt="Facebook logo" />
                    </a>
                    <a href="https://twitter.com/">
                        <img src={xLogo} alt="Twitter logo" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
