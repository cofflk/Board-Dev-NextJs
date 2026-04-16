'use client';
import { useGetLogonUserQuery } from '@/redux/services/auth/logonUserApi';
import styles from './header.module.scss';
export default function HeaderClient() {
    const { data, error, isLoading, isSuccess } = useGetLogonUserQuery();

    console.log('HeaderClient', data, error, isLoading, isSuccess)
    return (
        <div className={`${styles.container} ${styles.right}`}>
            <span>HEADER</span>
            <div className={styles.logonUser}>
                <div className={styles.logonUserInfo}>
                    <div className={styles.logonUserInfoItem}>
                        <span className={styles.logonUserInfoItemValue}>{data?.USER_NM} {data?.TITLE_NM}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}