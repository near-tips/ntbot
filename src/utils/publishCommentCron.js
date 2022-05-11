const cron = require('node-cron');
const { createComment } = require("./comment");
const StackComment = require('../models/stackComment.model');

const runPublishCommentCron = () => {
    cron.schedule('*/16 * * * * *', async () => {
        const latest = await StackComment.findOne({}, {}, { sort: { 'created_at' : -1 } });
        if (latest) {
            try {
                const { _id, postId, nicknames } = latest
                await createComment(postId, nicknames)
                await StackComment.deleteOne({ _id })
            } catch (e) {
                console.log('Cron error \n', '\n' + e + '\nend')
            }
        }
    });
}

module.exports = {
    runPublishCommentCron
}