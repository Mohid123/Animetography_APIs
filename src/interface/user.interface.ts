/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface User extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    avatar: any[];
    deletedCheck: boolean;
    isAdmin: boolean;
    isWriter: boolean;
    isVerified: boolean;
}