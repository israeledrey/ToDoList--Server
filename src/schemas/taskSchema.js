const Joi = require("joi");

const geoJsonSchema = Joi.object({
  type: Joi.string().valid("FeatureCollection").required(),
  features: Joi.array().items(
    Joi.object({
      type: Joi.string().valid("Feature").required(),
      geometry: Joi.object({
        type: Joi.string().valid("Point").required(),
        coordinates: Joi.array().items(
          Joi.number().required(),
          Joi.number().required()
        ).length(2).required()
      }).required(),
      properties: Joi.object().default({})
    }).required()
  ).min(1).required()
}).messages({
  "object.base": "Location must be a valid GeoJSON FeatureCollection with Point geometry",
  "any.required": "Location is required",
});


const taskSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Task name is required"
  }),

  subject: Joi.string()
    .valid("Work", "Leisure", "Studies").required().messages({
      "any.only": "Task subject must be one of: Work, Leisure, Studies",
    }),

  dayToComplete: Joi.date().iso().allow("").optional().messages({
    "any.only": "The date must be in (YYYY-MM-DD) format"
  }),

  priority: Joi.string().default("20%").messages({
    "string.pattern.base": "Priority must be a number followed by '%', e.g., '20%'",
  }),

  completed: Joi.boolean().default(false).messages({
    "boolean.base": "Completed must be true or false",
  }),

  location: geoJsonSchema,

  createdAt: Joi.forbidden(),
  
  updatedAt: Joi.forbidden(),
});

module.exports = taskSchema;