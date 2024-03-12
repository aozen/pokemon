const { matchedData, validationResult } = require("express-validator");

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = [];
    errors.array().map((error) => {
      validationErrors.push(error.msg);
    });
    return res.status(422).json({ message: 'Validation error', errors: validationErrors });
  }
  req.validators = matchedData(req);
  next();
};

module.exports = { validate };
