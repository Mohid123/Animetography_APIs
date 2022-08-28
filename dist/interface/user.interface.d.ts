import { Document } from 'mongoose';
export interface User extends Document {
    id?: string;
    fullName: string;
    email: string;
    username: string;
    password: string;
    avatar: any[];
    deletedCheck: boolean;
    isAdmin: boolean;
}
