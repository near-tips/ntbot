const mongoose = require('mongoose');

/**
 * Stack Comment Schema
 * @private
 */
const stackCommentSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    postId: {
        type: String,
        required: true,
    },
    nicknames: {
        type: [String],
        required: true,
    },
}, {
    timestamps: true,
    autoCreate: true
});

stackCommentSchema.statics = {
    /**
     * Generate a reset token object and saves it into the database
     *
     * @param { Object} comment
     * @param { String } comment.postId
     * @param { String[] } comment.nicknames
     * @param { Object} comment
     * @returns { StackComment }
     */
    async generate(comment) {
        const StackCommentObject = new StackComment({
            postId: comment.postId,
            nicknames: comment.nicknames,
        });
        await StackCommentObject.save();
        return StackCommentObject;
    },
};

/**
 * @typedef StackComment
 */
const StackComment = mongoose.model('StackComment', stackCommentSchema);
module.exports = StackComment;