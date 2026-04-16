import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LogonUserState {
    empNo: string;
    roles: string[];
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
}