//ProductManager.tsx
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
import TitleSection from '../../../components/TitleSection/TitleSection';

interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string;
    productId: number;
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
        category: '',
        createdAt: '',
        updatedAt: '',
        productId: 0,
    });
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentProductId, setCurrentProductId] = useState<string | null>(
        null
    );
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null
    );
    const [categories, setCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('asc');
    type SortKey = 'createdAt' | 'updatedAt' | 'price' | 'name' | 'category';
    const [sortType, setSortType] = useState<SortKey>('createdAt');

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

    useEffect(() => {
        const uniqueCategories = Array.from(
            new Set(products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
    }, [products]);

    useEffect(() => {
        setProducts((prevProducts) => [...prevProducts].sort(sortProducts));
    }, [sortType, sortOrder]);

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]:
                name === 'price' || name === 'quantity' || name === 'productId'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const now = new Date().toISOString();
        if (isEditing && currentProductId) {
            const productDocRef = doc(db, 'products', currentProductId);
            await updateDoc(productDocRef, {
                ...formState,
                updatedAt: now,
            });
            setIsEditing(false);
            setCurrentProductId(null);
        } else {
            const productCollection = collection(db, 'products');
            await addDoc(productCollection, {
                ...formState,
                createdAt: now,
                updatedAt: now,
            });
        }
        setFormState({
            name: '',
            price: 0,
            description: '',
            imageUrl: '',
            quantity: 0,
            category: '',
            createdAt: '',
            updatedAt: '',
            productId: 0,
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

    const sortProducts = (a: Product, b: Product) => {
        const isReversed = sortOrder === 'asc' ? 1 : -1;

        let aValue = a[sortType];
        let bValue = b[sortType];

        if (sortType === 'price') {
            aValue = Number(aValue);
            bValue = Number(bValue);
            return isReversed * (aValue - bValue);
        } else if (sortType === 'createdAt' || sortType === 'updatedAt') {
            return (
                isReversed *
                (new Date(aValue).getTime() - new Date(bValue).getTime())
            );
        } else {
            return (
                isReversed * aValue.toString().localeCompare(bValue.toString())
            );
        }
    };

    if (isLoading) return <p>Loading...</p>;

    if (!isAdmin) return <p>Access Denied</p>;

    return (
        <div className={styles['product-manager']}>
            <TitleSection title="Product Manager" />
            <div className={styles['manager-container']}>
                <div className={styles['form-container']}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Product Name:
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleInputChange}
                                placeholder="Product Name"
                                required
                            />
                        </label>
                        <label>
                            Product Price:
                            <input
                                type="number"
                                name="price"
                                value={formState.price}
                                onChange={handleInputChange}
                                placeholder="Product Price"
                                required
                            />
                        </label>
                        <label>
                            Product Description:
                            <textarea
                                name="description"
                                value={formState.description}
                                onChange={handleInputChange}
                                placeholder="Product Description"
                                required
                            />
                        </label>
                        <label>
                            Image:
                            <input
                                type="text"
                                name="imageUrl"
                                value={formState.imageUrl}
                                onChange={handleInputChange}
                                placeholder="Product Image URL"
                                required
                            />
                        </label>
                        <label>
                            In stock:
                            <input
                                type="number"
                                name="quantity"
                                value={formState.quantity}
                                onChange={handleInputChange}
                                placeholder="Product Quantity"
                                required
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                name="category"
                                value={formState.category}
                                onChange={handleInputChange}
                                placeholder="Product Category"
                                required
                            />
                            <select
                                name="category"
                                value={formState.category}
                                onChange={handleInputChange}
                                required
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Product ID:
                            <input
                                type="number"
                                name="productId"
                                value={formState.productId}
                                onChange={handleInputChange}
                                placeholder="Product ID"
                                required
                            />
                        </label>
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
                                category: '',
                                createdAt: '',
                                updatedAt: '',
                                productId: 0,
                            });
                            setIsEditing(false);
                            setCurrentProductId(null);
                            setSelectedProductId(null);
                        }}
                    >
                        Clear Product Form
                    </button>
                    <label>
                        Sort Products:
                        <select
                            name="sortType"
                            value={sortType}
                            onChange={(e) =>
                                setSortType(e.target.value as SortKey)
                            }
                        >
                            <option value="createdAt">Created</option>
                            <option value="updatedAt">Updated</option>
                            <option value="price">Price</option>
                            <option value="name">Product Name</option>
                            <option value="category">Category</option>
                        </select>
                        <select
                            name="sortOrder"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </label>
                </div>
                <div className={styles['product-list-wrap']}>
                    <div className={styles['product-list-header']}>
                        <p></p>
                        <p>Product Name</p>
                        <p>Description</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Category</p>
                        <p>Product ID</p>
                        <p>Created At</p>
                        <p>Updated At</p>
                        <p></p>
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
                                <p>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className={styles['product-image']}
                                    />
                                </p>
                                <p>{product.name}</p>
                                <p>{product.description}</p>
                                <p>${product.price.toFixed(2)}</p>
                                <p>{product.quantity}</p>
                                <p>{product.category}</p>
                                <p>{product.productId}</p>
                                <p>
                                    {new Date(
                                        product.createdAt
                                    ).toLocaleString()}
                                </p>
                                <p>
                                    {new Date(
                                        product.updatedAt
                                    ).toLocaleString()}
                                </p>
                                <p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(product.id!);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
