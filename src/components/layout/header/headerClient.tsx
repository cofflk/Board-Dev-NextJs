'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetLogonUserQuery } from '@/redux/services/auth/logonUserApi';
import styles from './header.module.scss';

import AvatarIcon from './avatarIcon';
export default function HeaderClient() {
    const { data, error, isLoading, isSuccess } = useGetLogonUserQuery();

    return (
        <div className={`${styles.container} ${styles.right}`}>
            {
                data?.EMP_NO !== '' && 
                <div className={styles.avatarButton}>
                    <AvatarIcon />
                </div>
            }
        </div>
    );
}