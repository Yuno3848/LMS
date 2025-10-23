export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      console.error('❌ AsyncHandler Error:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      next(error);
    });
  };
};
