import React, { useEffect, useState } from 'react';
import styles from './ProductsList.module.scss';
import { useGetCategories } from '@/hooks/queries/use-get-categories/useGetCategories';
import { useGetProductsByCategory } from '@/hooks/queries/use-get-products-by-category/useGetProductsByCategory';

const ProductsList = () => {
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState<{ id: string; category: string }[]>(
        [],
    );

    useEffect(() => {
        if (categories && categories.length > 0) {
            const random = categories.sort(() => 0.5 - Math.random());
            setSelectedCategory(
                random.slice(0, 2).map(category => ({
                    id: category.id,
                    category: category.category,
                })),
            );
        }
    }, [categories]);

    const {
        data: products1,
        isLoading: productsLoading1,
        isError: productsError1,
    } = useGetProductsByCategory({ categoryId: selectedCategory[0]?.id, page: 1 });
    const {
        data: products2,
        isLoading: productsLoading2,
        isError: productsError2,
    } = useGetProductsByCategory({ categoryId: selectedCategory[1]?.id, page: 1 });

    return (
        <section className={styles.productsList}>
            <div className={styles.cnt}>
                <div className={styles.category}>
                    <div className={styles.info}>
                        <h6 className={styles.infoName}>{selectedCategory[0]?.category}</h6>
                    </div>
                    <ul className={styles.list}>
                        {products1?.products &&
                            products1?.products.slice(0, 5).map(product => (
                                <li key={product.id} className={styles.listItem}>
                                    <div className={styles.imgCnt}>
                                        <img
                                            className={styles.img}
                                            src={product.imgArr[0]}
                                            alt={`Зображення товару ${product.name} категорії ${selectedCategory[0]?.category}}`}
                                        />
                                    </div>
                                    <div className={styles.name}>{product.name}</div>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className={styles.category}>
                    <div className={styles.info}>
                        <h6 className={styles.infoName}>{selectedCategory[1]?.category}</h6>
                    </div>
                    <ul className={styles.list}>
                        {products2?.products &&
                            products2?.products.slice(0, 5).map(product => (
                                <li key={product.id} className={styles.listItem}>
                                    <div className={styles.imgCnt}>
                                        <img
                                            className={styles.img}
                                            src={product.imgArr[0]}
                                            alt={`Зображення товару ${product.name} категорії ${selectedCategory[1]?.category}}`}
                                        />
                                    </div>
                                    <div className={styles.name}>{product.name}</div>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductsList;
