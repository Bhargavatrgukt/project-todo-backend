import * as Yup from "yup";

// Define shared schema for tasks and comments
const taskAndCommentSchema = Yup.object()
  .shape({
    content: Yup.string().required("Content is required"),
    description: Yup.string().nullable(),
    due_date: Yup.date().nullable(),
    is_completed: Yup.boolean()
      .nullable()
      .typeError("is_completed must be a boolean"),
    user_id: Yup.number()
      .integer()
      .required("User ID is required")
      .positive("User ID must be a positive integer"),
    task_id: Yup.number().integer().nullable(),
    project_id: Yup.number().integer().nullable(),
  })
  .test(
    "task-or-project",
    "Either task_id or project_id must be provided",
    (value) => value.task_id || value.project_id // Ensure either task_id or project_id is present
  );

const schemas = {
  projects: {
    POST: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      color: Yup.string().nullable(),
      is_favorite: Yup.boolean().nullable(),
      user_id: Yup.number()
        .integer("User ID must be an integer")
        .required("User ID is required"),
    }),
    PUT: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      color: Yup.string().nullable(),
      is_favorite: Yup.boolean().nullable(),
    }),
  },
  tasks: {
    POST: taskAndCommentSchema, // Reuse the same schema for POST
    PUT: taskAndCommentSchema, // Reuse the same schema for PUT
  },
  comments: {
    POST: taskAndCommentSchema, // Reuse the same schema for POST
    PUT: taskAndCommentSchema, // Reuse the same schema for PUT
  },
};

// Middleware to validate the request body
export const validateRequest = async (req, res, next) => {
  const resource = req.path.split("/")[1];
  const method = req.method;
  const schema = schemas[resource]?.[method];
  if (!schema) {
    return res.status(500).json({ message: "Validation schema not found" });
  }

  try {
    // Validate the request body
    req.body = await schema.validate(req.body, { abortEarly: false });
    next(); // If validation passes, proceed to the next middleware or handler
  } catch (err) {
    // If validation fails, respond with errors
    res.status(400).json({ message: "Validation failed", errors: err.errors });
  }
};
