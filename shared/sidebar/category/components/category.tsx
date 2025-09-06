import Link from 'next/link';
import { CategoryButton } from './button/button';
import styles from '../styles/category.module.css';
import { CategoryProps } from '../types/category';

export const CategoryList = ({ categories }: CategoryProps) => {
    if (!categories || categories.length === 0) return <p>カテゴリがありません</p>;

    return (
        <div className={styles.categoryContainer}>
            <h2 className={styles.heading}>カテゴリー</h2>
            <ul className={styles.list}>
                {categories.map((cat) => (
                    <li key={cat.id} className={styles.item}>
                        <Link href={`/category/${cat.id}`} className={styles.link}>
                            <CategoryButton name={cat.name} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
