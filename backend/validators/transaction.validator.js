import { body, param } from 'express-validator';

export const validateCreateOrder = () => {
  return [
    body('amount')
      .exists({ checkFalsy: true })
      .withMessage('amount field is required')
      .bail()
      .isInt()
      .withMessage('amount must be an integer'),

    param('courseId')
      .notEmpty()
      .withMessage('course section id is required')
      .isString()
      .withMessage('course section id must be a string'),
  ];
};

export const validateVerifyPayment = () => [
  body('razorpay_order_id')
    .exists({ checkFalsy: true })
    .withMessage('razorpay_order_id is required')
    .isString()
    .withMessage('razorpay_order_id must be a string'),

  body('razorpay_payment_id')
    .exists({ checkFalsy: true })
    .withMessage('razorpay_payment_id is required')
    .isString()
    .withMessage('razorpay_payment_id must be a string'),

  body('razorpay_signature')
    .exists({ checkFalsy: true })
    .withMessage('razorpay_signature is required')
    .isString()
    .withMessage('razorpay_signature must be a string'),

  body('transactionId')
    .exists({ checkFalsy: true })
    .withMessage('transactionId is required')
    .isMongoId()
    .withMessage('transactionId must be a valid MongoDB ObjectId'),
];

export const validateTransaction = () => {
  return [
    param('transactionId')
      .exists({ checkFalsy: true })
      .withMessage('transactionId is required')
      .isString()
      .withMessage('transactionId must be a string'),
  ];
};
