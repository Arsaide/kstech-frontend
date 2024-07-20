import styles from './page.module.scss';
import MainPage from '@/components/pages/main-page/MainPage';

export default function Home() {
    return (
        <main className={styles.main}>
            <MainPage />
        </main>
    );
}
