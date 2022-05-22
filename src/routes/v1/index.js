const express = require('express');
const { validate } = require('express-validation');
const { exec } = require("child_process");
const { notify } = require("../../validations/notify.validation");
const { withdrawTo } = require('../../validations/withdrawTo.validation');
const StackComment = require('../../models/stackComment.model');
const { nearContractAddress, nearAccountId } = require('../../config/vars');
const { handleError } = require("../../utils/handleError");
const router = express.Router();

router.post('/notify', validate(notify, {}, {}), async (req, res) => {
    const { postId, nicknames } = req.body;

    try {
        await StackComment.generate({ postId, nicknames })

        res.send('ok')
    } catch (error) {
        const status = error.response ? error.response.status : 400;
        const message = error.response ? error.response.data : error;
        console.log('Notify error \n', message);
        await handleError(message, 'Notify')
        res.status(status).json({
            success: false,
            message,
        });
    }
});

router.post('/withdraw_to', validate(withdrawTo, {}, {}), async (req, res) => {
    const callParams = req.body;

    exec(`near call ${ nearContractAddress } withdraw_tips_to '${ JSON.stringify(callParams) }' --accountId ${ nearAccountId }`, async (error, stdout, stderr) => {
        if (error) {
            const message = error.message;
            console.log(`error:\n${ message }`);

            await handleError(message, 'Withdraw')
            res.status(400).json({
                success: false,
                message,
            })
        }
        if (stderr) {
            console.log(`stderr:\n${ stderr }`);

            res.status(400).json({
                success: false,
                message: stderr,
            })
        }

        console.log(`stdout: \n ${ stdout }`);

        res.status(200).json({
            success: true,
            message: stdout,
        })
    });
});

module.exports = router;
