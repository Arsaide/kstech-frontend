import styles from './page.module.scss';
import ProductsList from '@/components/pages/productsList';

export default function Home() {
    return (
        <main className={styles.main}>
            <ProductsList />
        </main>
    );
}
