const express = require('express');
const axios = require("axios");
const https = require('https');

const router = express.Router();

const accessToken = 'GxHLa*A4*eJE6eLelOnIOg))'

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

        console.log('data', data);

        // https.get(`https://api.stackexchange.com/2.3/posts/${postId}/comments/add`, (resp) => {
        //     let data = '{"site": "stackoverflow", "access_token": "GxHLa*A4*eJE6eLelOnIOg))", "key": "6xURMARqiKBjGkKi0BQJkA((", "body": "Hi, your post was granted with tips, check it out on app.next-tips.com"}';
        //
        //     // A chunk of data has been received.
        //     resp.on('data', (chunk) => {
        //         data += chunk;
        //     });
        //
        //     // The whole response has been received. Print out the result.
        //     resp.on('end', () => {
        //         console.log(JSON.parse(data).explanation);
        //     });
        //
        // }).on("error", (err) => {
        //     console.log("Error: " + err.message);
        // });


        await axios.post(`https://api.stackexchange.com/2.3/posts/70393641/comments/add`, {
            body: {
                site: 'stackoverflow',
                access_token: accessToken,
                key: '6xURMARqiKBjGkKi0BQJkA((',
                body: `Hi, @${username} your post was granted with tips, check it out on app.next-tips.com`
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
