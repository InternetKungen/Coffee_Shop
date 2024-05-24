import { Link } from 'react-router-dom';
import LogoImg from '../../assets/img/logo-02.png';
import styles from './Logo.module.css';

function Logo() {
    return (
        <Link to="/">
            <img src={LogoImg} alt="Logo" className={styles['logo-img']} />
        </Link>
    );
}

export default Logo;
