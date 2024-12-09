# Todoist Clone API

This project is a RESTful API for a Todoist-like application, providing CRUD functionality for **Projects** and **Tasks**. It is built using **Express.js** and **SQLite3**.

## Features

### Projects

- Create, update, delete, and fetch projects.
- Each project has:
  - `name`: Name of the project.
  - `color`: Color for project categorization.
  - `is_favorite`: Boolean indicating if the project is marked as a favorite.

### Tasks

- Create, update, delete, and fetch tasks.
- Each task belongs to a project and has:
  - `content`: Title of the task.
  - `description`: Details about the task.
  - `due_date`: Deadline for the task.
  - `is_completed`: Status of task completion.
  - `created_at`: Timestamp when the task was created.

---

## API Endpoints

Detailed API documentation is available via Postman collections:

1. **Project APIs**:  
   [View Project API Collection](https://elements.getpostman.com/redirect?entityId=34844007-aef0e8af-e17d-44bf-bfed-8d2163b5dd76&entityType=collection)

2. **Task APIs**:  
   [View Task API Collection](https://elements.getpostman.com/redirect?entityId=34844007-34bc6241-7615-4b31-9b06-5a1d43d62156&entityType=collection)

---

The server will be available at `http://localhost:3000`.

## Endpoints

### Projects

- **Create a Project**: `POST /api/projects`
  - Body: `{ "name": "Project Name", "color": "#FF5733", "isFavorite": 1 }`
- **Update a Project**: `PUT /api/projects/:id`
  - Body: `{ "name": "Updated Name", "color": "#123456", "isFavorite": 0 }`
- **Delete a Project**: `DELETE /api/projects/:id`
- **Retrieve All Projects**: `GET /api/projects`

### Tasks

- **Create a Task**: `POST /api/:project_id/tasks`
  - Body: `{ "content": "Task Content", "description": "Detailed Task Description", "due_date": "YYYY-MM-DD", "is_completed": 0 }`
- **Update a Task**: `PUT /api/:project_id/tasks/:id`
  - Body: `{ "content": "Updated Content", "description": "Updated Description", "due_date": "YYYY-MM-DD", "is_completed": 1 }`
- **Delete a Task**: `DELETE /api/:project_id/tasks/:id`
- **Retrieve Tasks for a Project**: `GET /api/:project_id/tasks`

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **API Testing**: Postman
