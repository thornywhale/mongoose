const yup = require("yup");

module.exports.emailSchema = yup.string().trim().email().required();

module.exports.contentSchema = yup
  .string()
  .trim()
  .matches(/[A-Za-z0-9. ]{4,255}/)
  .required();
