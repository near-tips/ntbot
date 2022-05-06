const express = require('express');
const { validate } = require('express-validation');
const { exec } = require("child_process");

const { notify } = require("../../validations/notify.validation");
const { withdrawTo } = require('../../validations/withdrawTo.validation');
const StackComment = require('../../models/stackComment.model');
const { nearContractAddress, nearAccountId } = require('../../config/vars');

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

router.post('/withdraw_to', validate(withdrawTo, {}, {}), async (req, res) => {
    const callParams = req.body;

    exec(`near call ${nearContractAddress} withdraw_tips_to '${JSON.stringify(callParams)}' --accountId ${nearAccountId}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);

            res.status(400).json({
                success: false,
                message: stderr,
            })
        }

        console.log(`stdout: ${stdout}`);

        res.status(200).json({
            success: true,
            message: stdout,
        })
    });
});

module.exports = router;
