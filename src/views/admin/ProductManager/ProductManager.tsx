// // ProductManager.tsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../../../main';
// import {
//     collection,
//     addDoc,
//     updateDoc,
//     deleteDoc,
//     getDocs,
//     doc,
// } from 'firebase/firestore';
// import useAdminStatus from '../../../hooks/useAdminStatus';
// import styles from './ProductManager.module.css';

// // Define a TypeScript interface for the Product object
// interface Product {
//     id?: string;
//     name: string;
//     price: number;
//     description: string;
//     imageUrl: string;
//     quantity: number;
// }

// // ProductManager component
// const ProductManager: React.FC = () => {
//     const { isAdmin, isLoading } = useAdminStatus();
//     const [products, setProducts] = useState<Product[]>([]);
//     const [formState, setFormState] = useState<Product>({
//         name: '',
//         price: 0,
//         description: '',
//         imageUrl: '',
//         quantity: 0,
//     });
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [currentProductId, setCurrentProductId] = useState<string | null>(
//         null
//     );

//     const fetchProducts = async () => {
//         const productCollection = collection(db, 'products');
//         const productSnapshot = await getDocs(productCollection);
//         const productList = productSnapshot.docs.map((doc) => {
//             const data = doc.data();
//             return { id: doc.id, ...data } as Product;
//         });
//         setProducts(productList);
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleInputChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         const { name, value } = e.target;
//         setFormState((prevState) => ({
//             ...prevState,
//             [name]:
//                 name === 'price' || name === 'quantity' ? Number(value) : value,
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (isEditing && currentProductId) {
//             const productDocRef = doc(db, 'products', currentProductId);
//             await updateDoc(productDocRef, {
//                 name: formState.name,
//                 price: formState.price,
//                 description: formState.description,
//                 imageUrl: formState.imageUrl,
//                 quantity: formState.quantity,
//             });
//             setIsEditing(false);
//             setCurrentProductId(null);
//         } else {
//             const productCollection = collection(db, 'products');
//             await addDoc(productCollection, formState);
//         }
//         setFormState({
//             name: '',
//             price: 0,
//             description: '',
//             imageUrl: '',
//             quantity: 0,
//         });
//         await fetchProducts();
//     };

//     const handleEdit = (product: Product) => {
//         setFormState(product);
//         setIsEditing(true);
//         setCurrentProductId(product.id ?? null);
//     };

//     const handleDelete = async (productId: string) => {
//         const productDocRef = doc(db, 'products', productId);
//         await deleteDoc(productDocRef);
//         await fetchProducts();
//     };

//     if (isLoading) return <p>Loading...</p>;

//     if (!isAdmin) return <p>Access Denied</p>;

//     return (
//         <div className={styles['product-manager']}>
//             <h1>Product Manager</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="name"
//                     value={formState.name}
//                     onChange={handleInputChange}
//                     placeholder="Product Name"
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="price"
//                     value={formState.price}
//                     onChange={handleInputChange}
//                     placeholder="Product Price"
//                     required
//                 />
//                 <textarea
//                     name="description"
//                     value={formState.description}
//                     onChange={handleInputChange}
//                     placeholder="Product Description"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="imageUrl"
//                     value={formState.imageUrl}
//                     onChange={handleInputChange}
//                     placeholder="Product Image URL"
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="quantity"
//                     value={formState.quantity}
//                     onChange={handleInputChange}
//                     placeholder="Product Quantity"
//                     required
//                 />
//                 <button type="submit">
//                     {isEditing ? 'Update Product' : 'Add Product'}
//                 </button>
//             </form>
//             <div className={styles['product-list']}>
//                 {products.map((product) => (
//                     <div key={product.id} className={styles['product-item']}>
//                         <h2>{product.name}</h2>
//                         <p>{product.description}</p>
//                         <p>Price: ${product.price.toFixed(2)}</p>
//                         <p>Quantity: {product.quantity}</p>
//                         <button onClick={() => handleEdit(product)}>
//                             Edit
//                         </button>
//                         <button onClick={() => handleDelete(product.id!)}>
//                             Delete
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ProductManager;
import React, { useState, useEffect } from 'react';
import { db } from '../../../main';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    doc,
} from 'firebase/firestore';
import useAdminStatus from '../../../hooks/useAdminStatus';
import styles from './ProductManager.module.css';

interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity: number;
}

const ProductManager: React.FC = () => {
    const { isAdmin, isLoading } = useAdminStatus();
    const [products, setProducts] = useState<Product[]>([]);
    const [formState, setFormState] = useState<Product>({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
        quantity: 0,
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentProductId, setCurrentProductId] = useState<string | null>(
        null
    );
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
    );

    const fetchProducts = async () => {
        const productCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productCollection);
        const productList = productSnapshot.docs.map((doc) => {
            const data = doc.data();
            return { id: doc.id, ...data } as Product;
        });
        setProducts(productList);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]:
                name === 'price' || name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEditing && currentProductId) {
            const productDocRef = doc(db, 'products', currentProductId);
            await updateDoc(productDocRef, {
                name: formState.name,
                price: formState.price,
                description: formState.description,
                imageUrl: formState.imageUrl,
                quantity: formState.quantity,
            });
            setIsEditing(false);
            setCurrentProductId(null);
        } else {
            const productCollection = collection(db, 'products');
            await addDoc(productCollection, formState);
        }
        setFormState({
            name: '',
            price: 0,
            description: '',
            imageUrl: '',
            quantity: 0,
        });
        setSelectedProductId(null);
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setFormState(product);
        setIsEditing(true);
        setCurrentProductId(product.id ?? null);
        setSelectedProductId(product.id ?? null);
    };

    const handleDelete = async (productId: string) => {
        const productDocRef = doc(db, 'products', productId);
        await deleteDoc(productDocRef);
        fetchProducts();
    };

    if (isLoading) return <p>Loading...</p>;

    if (!isAdmin) return <p>Access Denied</p>;

    return (
        <div className={styles['product-manager']}>
            <h1>Product Manager</h1>
            <div className={styles['manager-container']}>
                <div className={styles['form-container']}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            value={formState.price}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                            required
                        />
                        <textarea
                            name="description"
                            value={formState.description}
                            onChange={handleInputChange}
                            placeholder="Product Description"
                            required
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            value={formState.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Product Image URL"
                            required
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={formState.quantity}
                            onChange={handleInputChange}
                            placeholder="Product Quantity"
                            required
                        />
                        <button type="submit">
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                    <button
                        onClick={() => {
                            setFormState({
                                name: '',
                                price: 0,
                                description: '',
                                imageUrl: '',
                                quantity: 0,
                            });
                            setIsEditing(false);
                            setCurrentProductId(null);
                            setSelectedProductId(null);
                        }}
                    >
                        Create New Product
                    </button>
                </div>
                <div className={styles['product-list']}>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className={`${styles['product-item']} ${
                                product.id === selectedProductId
                                    ? styles['selected']
                                    : ''
                            }`}
                            onClick={() => handleEdit(product)}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className={styles['product-image']}
                            />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                            <p>Quantity: {product.quantity}</p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(product.id!);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
