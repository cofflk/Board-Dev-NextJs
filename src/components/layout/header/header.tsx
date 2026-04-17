import styles from "./header.module.scss";
import HeaderClient from "./headerClient";
import Image from 'next/image';

export default function Header() {
    const logoUrl = `${process.env.NEXT_PUBLIC_HUB_URL}/eNovStyle/skin01/svg/haeahn/haeahn_CI.svg`;
    return (
        <header className={styles.header}>
            <div className={styles.header_ci}>
                <Image
                    className={styles.header_ci_image}
                    src={logoUrl}
                    alt="haeahn"
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                />
            </div>
            <HeaderClient />
        </header>
    );
}