const Joi = require ("joi");


const taskSchema = Joi.object({

  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Task name is required"
  }),

  subject: Joi.string()
  .valid("Work", "leisure", "Studies").required().messages({
    "any.only": "Task subject must be one of: Work, leisure, Studies",
  }),
  
  dayToComplete: Joi.date().iso().allow("").optional().messages({
    "any.only": "the date must be be in (YYYY-MM-DD) format"
  }),

  priority: Joi.string().default("20%").messages({
      "string.pattern.base": "Priority must be a number followed by '%', e.g., '20%'",
    }),

  completed: Joi.boolean().default(false).messages({
    "boolean.base": "Completed must be true or false",
  }),

  location: Joi.array().items(Joi.number()).default([]).messages({
      "array.base": "Location must be an array of numbers",
    }),

});


module.exports = taskSchema;