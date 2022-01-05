const express = require('express');
const { validate } = require('express-validation');
const { notify } = require("../../validations/notify.validation");
const StackComment = require('../../models/stackComment.model');

const router = express.Router();

router.post('/notify', validate(notify, {}, {}), async (req, res) => {
    const { postId, nicknames } = req.body;

    try {
        await StackComment.generate({ postId, nicknames })

        res.send('ok')
    } catch (error) {
        console.log('Notify error', error);
        res.status(400).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;
