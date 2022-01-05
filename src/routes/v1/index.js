const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const { validate } = require('express-validation');

const router = express.Router();
const { notify } = require("../../validations/notify.validation");
const { stackKey, accessToken, userId } = require("../../config/vars");

router.post('/notify', validate(notify, {}, {}), async (req, res) => {
    try {
        const { postId, nicknames } = req.body;

        const { data } = await axios.get(`https://api.stackexchange.com/2.3/posts/${postId}/comments`, {
            params: {
                site: 'stackoverflow',
                sort: 'creation',
                order: 'desc',
                access_token: accessToken,
                key: stackKey,
            }
        })

        if (data.items.some(({ owner }) => owner.user_id.toString() === userId)) {
            res.send('ok')
            return;
        }

        const usernames = nicknames.map(el => '@' + el).join(', ')

        await axios.post(`https://api.stackexchange.com/2.3/posts/${postId}/comments/add`, querystring.stringify({
            site: 'stackoverflow',
            access_token: accessToken,
            key: stackKey,
            body: `Hi, ${usernames} your post was granted with tips, check it out on https://app.near-tips.com`
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })

        res.send('ok')
    } catch (error) {
        // if (error.isAxiosError) {
        //
        // }
        console.log('error', error);
        res.status(400).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;
