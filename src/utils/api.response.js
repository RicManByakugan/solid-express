exports.ApiResponse = (message, status, data = null) => {
  return {
    message,
    status,
    data,
  };
};

exports.ApiResponseV2 = (response, status, message, data = null) => {
  return response.status(status).json({
    message,
    status,
    data,
  });
}