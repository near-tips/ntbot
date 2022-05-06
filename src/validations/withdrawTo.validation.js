const { Joi } = require("express-validation");

module.exports = {
  // POST /v1/withdraw_to
  withdrawTo: {
    body: Joi.object({
      service_id: Joi.object().keys({
        service: Joi.string(),
        id: Joi.string(),
      }).required(),
      account_id: Joi.string().required(),
      deadline: Joi.string().required(),
      signatures: Joi.array().items(Joi.array().items(Joi.number())).required(),
      validators_pks: Joi.array().items(Joi.string()).required(),
    }),
  },
};
