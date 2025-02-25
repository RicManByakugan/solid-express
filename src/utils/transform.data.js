const joi = require("joi");

/**
 * Transforms data using a provided Joi schema
 * @param {Object|Array} data - The data to transform (single JSON object or array)
 * @param {Object} schema - Joi schema to use for validation and transformation
 * @param {Object} options - Joi validation options
 * @returns {Object|Array|null} - Transformed data or null if validation fails
 */
exports.transformWithSchema = (data, schema, options = {}) => {
  const validationOptions = {
    stripUnknown: true, // Remove unknown properties
    abortEarly: false, // Return all errors, not just the first one
    ...options,
  };

  if (Array.isArray(data)) {
    return data
      .map((item) => {
        try {
          const { value, error } = schema.validate(item, validationOptions);

          if (error) {
            console.error("Validation error:", error.details);
            return null;
          }

          return value;
        } catch (err) {
          console.error("Transformation error:", err);
          return null;
        }
      })
      .filter(Boolean);
  }

  if (typeof data === "object" && data !== null) {
    try {
      const { value, error } = schema.validate(data, validationOptions);

      if (error) {
        console.error("Validation error:", error.details);
        return null;
      }

      return value;
    } catch (err) {
      console.error("Transformation error:", err);
      return null;
    }
  }

  console.error("Invalid data type. Expected an object or an array.");
  return null;
};
