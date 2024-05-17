// hooks/useAdminStatus.ts
import { useEffect, useState } from 'react';
import { auth, db } from '../main';
import { doc, getDoc } from 'firebase/firestore';

const useAdminStatus = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const user = auth.currentUser;

            if (user) {
                const docRef = doc(db, 'admins', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        };

        checkAdminStatus();
    }, []);

    return isAdmin;
};

export default useAdminStatus;
