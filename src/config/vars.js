const path = require('path');

// import .env variables
require('dotenv-safe').config({
    path: path.join(__dirname, '../../.env'),
    example: path.join(__dirname, '../../.env.example'),
});

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    stackKey: process.env.STACK_KEY,
    accessToken: process.env.ACCESS_TOKEN,
    userId: process.env.USER_ID,
    origin: process.env.ORIGIN,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
