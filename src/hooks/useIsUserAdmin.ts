import { useState, useEffect } from 'react';
import { db } from '../main';
import { doc, getDoc, FirestoreError } from 'firebase/firestore';

const useIsUserAdmin = (uid: string) => {
    const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            try {
                const adminRef = doc(db, 'admins', uid);
                const adminDoc = await getDoc(adminRef);
                if (adminDoc.exists()) {
                    setIsUserAdmin(true);
                } else {
                    setIsUserAdmin(false);
                }
            } catch (error) {
                if (error instanceof FirestoreError) {
                    // Hantera olika typer av Firestore-fel här
                    switch (error.code) {
                        case 'permission-denied':
                            console.error('Permission denied:', error.message);
                            setError('Missing or insufficient permissions.');
                            break;
                        default:
                            console.error('Firestore error:', error.message);
                            setError('An unexpected error occurred.');
                            break;
                    }
                } else {
                    console.error('Unexpected error:', error);
                    setError('An unexpected error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (uid) {
            fetchAdminStatus();
        }
    }, [uid]);

    return { isUserAdmin, isLoading, error };
};

export default useIsUserAdmin;
