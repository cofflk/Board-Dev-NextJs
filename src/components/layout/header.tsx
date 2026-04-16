import styles from "./header.module.scss";
import HeaderClient from "./headerClient";
export default function Header() {
    return (
        <header className={styles.header}>
            <HeaderClient />
        </header>
    );
}