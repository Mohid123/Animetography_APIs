"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
exports.UserSchema = new mongoose.Schema({
    _id: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    avatar: { type: Array, default: [] },
    deletedCheck: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isWriter: { type: Boolean, default: false }
}, {
    collection: 'User',
});
exports.UserSchema.set('timestamps', true);
exports.UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
exports.UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.email = this.email.toLowerCase();
    next();
});
//# sourceMappingURL=user.schema.js.map