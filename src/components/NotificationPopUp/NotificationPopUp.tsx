// NotificationPopUp.tsx
import React, { useEffect } from 'react';
import styles from './NotificationPopUp.module.css';

interface NotificationPopUpProps {
    message: string;
    onClose: () => void;
}

const NotificationPopUp: React.FC<NotificationPopUpProps> = ({
    message,
    onClose,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Notification disappears after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.notification}>
            <p>{message}</p>
        </div>
    );
};

export default NotificationPopUp;
