import { Menu } from './menu';
import { Logo } from './logo';
import styles from '../styles/header.module.css';

export const Header = () => {
    const menuItems = [
        { label: 'ホーム', href: '/' },
        { label: 'このブログについて', href: '/about' },
        { label: 'プロフィール', href: '/profile' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Logo
                    label={
                        <>
                            <span className={styles.mainTitle}>テク日記</span>
                            <br />
                            <span className={styles.subTitle}>～かけだしエンジニアの技術日記～</span>
                        </>
                    }
                />
            </div>
            <div className={styles.nav}>
                <Menu items={menuItems} />
            </div>
        </header>
    );
};
