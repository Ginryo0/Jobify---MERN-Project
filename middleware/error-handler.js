import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later.',
  };

  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }
  // err.code === 1100 = -email- not unique
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique.`;
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
