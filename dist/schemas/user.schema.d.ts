import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    email: string;
    password: string;
    _id: string;
    fullName: string;
    username: string;
    avatar: any[];
    deletedCheck: boolean;
    isAdmin: boolean;
}>;
