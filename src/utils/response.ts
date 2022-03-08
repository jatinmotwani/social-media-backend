export const sendRes = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    data,
    message,
  });
};

export const unauthorized = (res, message = "Unauthorized", data = {}) => {
  return sendRes(res, 401, message, data);
};

export const badRequest = (res, message = "Bad Request", data = {}) => {
  return sendRes(res, 400, message, data);
};

export const internalServerError = (
  res,
  message = "Bad Request",
  data = {}
) => {
  return sendRes(res, 500, message, data);
};

export const successResponse = (res, message = "Success", data = {}) => {
  return sendRes(res, 200, message, data);
};
