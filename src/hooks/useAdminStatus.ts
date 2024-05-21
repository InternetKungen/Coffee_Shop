// hooks/useAdminStatus.ts
import { useEffect, useState } from 'react';
import { auth, db } from '../main';
import { doc, getDoc } from 'firebase/firestore';

const useAdminStatus = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const user = auth.currentUser;

            if (user) {
                const docRef = doc(db, 'admins', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('User is admin');
                    setIsAdmin(true);
                } else {
                    console.log('User is not admin');
                    setIsAdmin(false);
                }
            }
            setIsLoading(false);
        };

        checkAdminStatus();
    }, []);

    return { isAdmin, isLoading };
};

export default useAdminStatus;
