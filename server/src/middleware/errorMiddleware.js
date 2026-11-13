const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
const {
  logError,
} = require("../utils/logger")
  logError(err.message)

  const statusCode = res.statusCode === 200
    ? 500
    : res.statusCode

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server Error",
  })

}

module.exports = errorMiddleware