import LogoImg from '../../assets/img/logo-02.png';
import styles from './Logo.module.css';

function Logo() {
    return <img src={LogoImg} alt="Logo" className={styles['logo-img']} />;
}

export default Logo;
