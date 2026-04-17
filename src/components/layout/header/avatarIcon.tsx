'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';

import { useGetLogonUserQuery } from '@/redux/services/auth/logonUserApi';
import { config } from '@/config';
import styles from './avatarIcon.module.scss';

export default function AvatarIcon() {
    const { data, error, isLoading, isSuccess } = useGetLogonUserQuery();
    const avatarButtonRef = useRef<HTMLDivElement>(null);
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);

    return (
        <div className={styles.avatarButtonContainer} ref={avatarButtonRef}>

            <div className={styles.avatarButtonWrapper} >
                <button type="button" 
                    className={styles.avatarButton}
                    aria-expanded={dropdownMenuOpen}
                    aria-haspopup="menu"
                    aria-label="사용자 메뉴"
                    onClick={() => setDropdownMenuOpen((v) => !v)}>
                    
                    <div className={styles.avatarIcon}>
                        {data?.PHOTO_URL && data?.PHOTO_URL !== '' && (
                            <Image
                                className={styles.avatarIconImage}
                                src={`${config.hubStorageUrl}${data?.PHOTO_URL}`} 
                                alt="avatar" 
                                width={0}
                                height={0}
                                sizes="100vw"
                                priority
                            />   
                        )}
  
                    </div>

                    <span className={styles.logonUserInfoItemValue}>{data?.USER_NM} {data?.TITLE_NM}</span>
                </button>

                {dropdownMenuOpen && (
                    <div className={styles.dropdownMenu} role="menu">
                        <button
                        type="button"
                        role="menuitem"
                        className={styles.dropdownItem}
                        onClick={() => {
                            // closeMenu();
                            alert("menu2");
                        }}
                        >
                        내 정보
                        </button>
                        <button
                        type="button"
                        role="menuitem"
                        className={styles.dropdownItem}
                        onClick={() => {
                            // dispatch(logout());
                            // closeMenu();
                            alert("menu3");
                        }}
                        >
                        로그아웃
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}