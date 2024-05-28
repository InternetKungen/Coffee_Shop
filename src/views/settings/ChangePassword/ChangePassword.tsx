import { useState } from 'react';
import { auth } from '../../../main';
import { updatePassword } from 'firebase/auth';
import styles from './ChangePassword.module.css';
import TitleSection from '../../../components/TitleSection/TitleSection';

const ChangePassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError('Lösenorden matchar inte');
            return;
        }

        const user = auth.currentUser;

        if (user) {
            try {
                await updatePassword(user, newPassword);
                setSuccess('Lösenordet har ändrats');
                setError('');
            } catch (error: any) {
                setError(
                    'Det gick inte att ändra lösenordet: ' + error.message
                );
                setSuccess('');
            }
        } else {
            setError('Ingen användare inloggad');
            setSuccess('');
        }
    };

    return (
        <div className={styles['change-password-container']}>
            <TitleSection title="Change Password" />
            {error && <p className={styles['error-message']}>{error}</p>}
            {success && <p className={styles['success-message']}>{success}</p>}
            <label>
                New Password:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </label>
            <label>
                Repeat New Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default ChangePassword;
