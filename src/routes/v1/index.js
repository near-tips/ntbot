const express = require('express');
const axios = require("axios");
const querystring = require('querystring');

const router = express.Router();

const accessToken = 'GxHLa*A4*eJE6eLelOnIOg))'
const userId = '17702641'

router.post('/notify', async (req, res) => {
    try {
        const { postId, username } = req.body;

        const { data } = await axios.get(`https://api.stackexchange.com/2.3/posts/${postId}/comments`, {
            params: {
                site: 'stackoverflow',
                sort: 'creation',
                order: 'desc',
            }
        })

        if (data.items.some(({ owner }) => owner.user_id.toString() === userId)) {
            res.send('ok')
        }

        await axios.post(`https://api.stackexchange.com/2.3/posts/${postId}/comments/add`, querystring.stringify({
            site: 'stackoverflow',
            access_token: accessToken,
            key: '6xURMARqiKBjGkKi0BQJkA((',
            body: `Hi, @${username} your post was granted with tips, check it out on app.next-tips.com`
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })

        res.send('ok')
    } catch (error) {
        console.log('error', error);
        res.status(400).json({
            success: false,
            message: error
        });
    }
});

module.exports = router;
