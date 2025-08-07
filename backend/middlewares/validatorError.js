import { validationResult } from 'express-validator';

export const validatorError = (req, res, next) => {
  const errors = validationResult(req).array();

  if (errors.length === 0) {
    return next();
  }

  console.log('user verification error:', errors);

  return res.status(409).json({
    statusCode: 409,
    message: 'Invalid Data',
    errors: errors.map((err) => ({
      message: err.msg,
      location: err.location,
    })),
  });
};
