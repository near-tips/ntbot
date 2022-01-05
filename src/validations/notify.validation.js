const { Joi } = require("express-validation");

module.exports = {
    // POST /v1/notify
    notify: {
        body: Joi.object({
            postId: Joi.string().required(),
            nicknames: Joi.array().items(Joi.string()).required(),
        }),
    },
};
