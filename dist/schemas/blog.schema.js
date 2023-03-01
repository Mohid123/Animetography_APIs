"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchema = void 0;
const mongoose = require("mongoose");
exports.BlogSchema = new mongoose.Schema({
    _id: { type: String, default: '' },
    blogTitle: { type: String, default: '' },
    blogSubtitle: { type: String, default: '' },
    blogContent: { type: String, default: '' },
    postedDate: { type: Number },
    coverImage: { type: Array, default: [] },
    deletedCheck: { type: Boolean, default: false }
}, {
    collection: 'Blog',
});
exports.BlogSchema.set('timestamps', true);
exports.BlogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
mongoose.model('blog', exports.BlogSchema);
exports.BlogSchema.pre('save', async function (next) {
    next();
});
//# sourceMappingURL=blog.schema.js.map