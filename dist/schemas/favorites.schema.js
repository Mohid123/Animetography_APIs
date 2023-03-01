"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteSchema = void 0;
const mongoose = require("mongoose");
const utils_1 = require("../utils/utils");
exports.FavouriteSchema = new mongoose.Schema({
    _id: { type: String, default: utils_1.generateStringId },
    postID: { type: String, default: '' },
    userID: { type: String, default: '' },
    deletedCheck: { type: Boolean, default: false },
}, {
    collection: 'Favorites',
});
exports.FavouriteSchema.set('timestamps', true);
exports.FavouriteSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
mongoose.model('favorites', exports.FavouriteSchema);
exports.FavouriteSchema.pre('save', async function (next) {
    next();
});
//# sourceMappingURL=favorites.schema.js.map