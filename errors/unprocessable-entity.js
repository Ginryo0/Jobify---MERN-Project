import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api.js';

class UnprocessableEntityError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}

export default UnprocessableEntityError;
