const axios = require("axios");
const { errorBotServer } = require('../config/vars');

const handleError = async (error, funcName) => {
    await axios.post(errorBotServer + '/v1/handleError', {
        service: 'NTBot',
        error: JSON.stringify(error),
        funcName,
    }).catch((e) => console.log('Cant handle error', e.response.data.details.body))
}

module.exports = {
    handleError
}