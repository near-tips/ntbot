const axios = require("axios");
const { accessToken, stackKey, userId } = require("../config/vars");
const querystring = require("querystring");

const createComment = async (postId, nicknames) => {
    try {
        const { data } = await axios.get(`https://api.stackexchange.com/2.3/posts/${postId}/comments`, {
            params: {
                site: 'stackoverflow',
                sort: 'creation',
                order: 'desc',
                access_token: accessToken,
                key: stackKey,
            }
        })

        console.log('data', data);

        if (data.items.some(({ owner }) => owner.user_id.toString() === userId)) {
            return;
        }

        const usernames = nicknames.map(el => '@' + el).join(', ')
        console.log('usernames', usernames);

        const reason = await axios.post(`https://api.stackexchange.com/2.3/posts/${postId}/comments/add`, querystring.stringify({
            site: 'stackoverflow',
            access_token: accessToken,
            key: stackKey,
            body: `Hi, ${usernames} your post was granted with tips, check it out on https://app.near-tips.com`
        }), {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })

        console.log('done', reason);
    } catch (e) {
        console.log('Create comment error: ', e + '\nend')
        console.log('Create comment message: ', e.message)
        throw new Error(e)
    }

}

module.exports = {
    createComment,
}