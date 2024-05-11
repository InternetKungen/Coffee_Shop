import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db } from '../main';

interface ShoppingItem {
    name: string;
    done: boolean;
}

// items/{newItem}

// users/{uid}/items/{newItem}

const AddItem = () => {
    const [itemName, setItemName] = useState('');

    const handleSave = async () => {
        const user = auth.currentUser;

        if (!user) {
            console.log('Error not signed in');
            return;
        }

        const newItem: ShoppingItem = {
            name: itemName,
            done: false,
        };

        try {
            await addDoc(collection(db, 'users', user.uid, 'items'), newItem);
            setItemName('');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <label>Item:</label>
            <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            ></input>

            <button onClick={handleSave}>Save</button>
        </>
    );
};

export default AddItem;
