import { Button } from '../../types/category';
import styles from './button.module.css';

export const CategoryButton = ({ name }: Button) => {
    return <button className={styles.button}>{name}</button>;
};
